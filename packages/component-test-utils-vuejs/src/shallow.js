const Vue = require('vue');
const MockRender = require('./mock-render/mock-render.mixin');

class ComponentWrapper {
  constructor(cmp) {
    this.LocalVue = Vue.extend({});
    MockRender.mock(this.LocalVue);

    this.vueInstance = new this.LocalVue({
      render(h) {
        return h(cmp);
      },
      components: {
        cmp
      }
    });

    this.vm = this.vueInstance.$mount();
  }

  view() {
    return this.vm.$el.outerHTML;
  }
}

exports.ComponentWrapper = ComponentWrapper;
exports.shallow = cmp => {
  return new ComponentWrapper(cmp);
};
