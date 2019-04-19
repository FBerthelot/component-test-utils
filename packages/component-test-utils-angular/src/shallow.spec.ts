import 'core-js/es7/reflect';

import {Component} from '@angular/core';

import {shallow} from './shallow';

@Component({
    selector: 'component',
    template: '<h1>Hello test world</h1>'
    })
class MyComponent {}

describe('Angular shallow', () => {
    it('should return html', () => {
        const cmp = shallow(MyComponent);
        expect(cmp.html()).toBe('<h1>Hello test world</h1>');
    });
});
