
exports.mock = vueInstance => {
  vueInstance.mixin({
    beforeCreate() {
      const vm = this;
      const originalCreateElement = vm.$createElement;

      function createElementMock(element, ...args) {
        return originalCreateElement(element, ...args);
      }

      vm._c = createElementMock;
      vm.$createElement = createElementMock;
    }
  });
};
