const MockRender = require('./mock-render.mixin');

describe('mock-render', () => {
  let vueInstanceMock;
  beforeEach(() => {
    vueInstanceMock = {
      mixin: jest.fn()
    };
  });

  it('should call vueInstance.mixin function', () => {
    MockRender.mock(vueInstanceMock);
    expect(vueInstanceMock.mixin).toHaveBeenCalled();
  });

  describe('beforeCreate', () => {
    let mixin;
    beforeEach(() => {
      MockRender.mock(vueInstanceMock);
      mixin = vueInstanceMock.mixin.mock.calls[0][0];
    });

    it('should implement the beforeCreate hook', () => {
      expect(typeof mixin.beforeCreate === 'function').toBe(true);
    });

    it('should redifned $createElement vm function', () => {
      mixin.beforeCreate();
      expect(typeof mixin.$createElement === 'function').toBe(true);
    });

    it('should redifned _c vm function', () => {
      mixin.beforeCreate();
      expect(typeof mixin._c === 'function').toBe(true);
    });
  });

  describe('createElementMock', () => {
    let createElementMock;
    let originalCreateElement;
    beforeEach(() => {
      MockRender.mock(vueInstanceMock);
      const mixin = vueInstanceMock.mixin.mock.calls[0][0];
      mixin.$createElement = jest.fn();
      originalCreateElement = mixin.$createElement;
      mixin.beforeCreate();
      createElementMock = mixin._c;
    });

    it('should call create originalCreateElement with default params by default', () => {
      const element = {};
      createElementMock(element, 'toto', 'tata', 'polp');
      expect(originalCreateElement).toHaveBeenCalledWith(element, 'toto', 'tata', 'polp');
    });
  });
});
