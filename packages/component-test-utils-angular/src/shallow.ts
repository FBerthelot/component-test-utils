import 'core-js/es7/reflect';

import {NgModule, NgZone} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {ɵDOMTestComponentRenderer as DOMTestComponentRenderer} from '@angular/platform-browser-dynamic/testing';
import {ɵTestingCompilerFactory as TestingCompilerFactory, TestComponentRenderer} from '@angular/core/testing';
import {ɵNoopNgZone as NoopNgZone} from '@angular/core';
import {platformServerTesting, ServerTestingModule} from '@angular/platform-server/testing';

/*interface ShallowOptions {
    debug: boolean; // Mostly a placeholder
}*/

class ShallowRender {
    private readonly rootElId = 'root-test';

    private readonly rootElSelector = `#${this.rootElId}`;

    private document: any;

    public constructor(private component: any/*, private options: ShallowOptions*/) {
        this.render();
    }

    private render(): void {
        const {component} = this;

        @NgModule({
            declarations: [component],
            imports: [ServerTestingModule],
            providers: [
                {provide: NgZone, useClass: NoopNgZone},
                {provide: TestComponentRenderer, useClass: DOMTestComponentRenderer}
            ],
            jit: true
        })
        class TestModule { }

        const platformRef = platformServerTesting();

        const {injector} = platformRef;
        const compilerFactory: TestingCompilerFactory = injector.get(TestingCompilerFactory);
        const compiler = compilerFactory.createTestingCompiler();
        const moduleWithComopnentFactories = compiler.compileModuleAndAllComponentsSync(TestModule);
        const moduleFactory = moduleWithComopnentFactories.ngModuleFactory;
        const moduleRef = moduleFactory.create(injector);
        const componentFactory = moduleWithComopnentFactories.componentFactories[0];

        const testComponentRenderer: TestComponentRenderer = moduleRef.injector.get(TestComponentRenderer);

        testComponentRenderer.insertRootElement(this.rootElId);
        componentFactory.create(injector, [], this.rootElSelector, moduleRef);

        this.document = injector.get(DOCUMENT) as any;
    }

    public html(): string {
        return this.document.querySelector(this.rootElSelector).serialize();
    }
}

export const shallow = (component: any/*, config: ShallowOptions*/) => {
    return new ShallowRender(component/*, config */);
};
