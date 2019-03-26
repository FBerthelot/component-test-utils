const React = require('react');
const {render} = require('./render');

describe('render tree', () => {
  describe('firstRender', () => {
    it('should just return undefined when reactEl is undefined', () => {
      expect(render()).toBe(undefined);
    });

    it('should return abcd if reactEl is abcd string', () => {
      expect(render('abcd')).toBe('abcd');
    });

    it('should not shallow child component that is string', () => {
      expect(
        render(
          {
            props: {
              children: 'toto'
            }
          },
          {}
        )
      ).toEqual({
        props: {
          children: 'toto'
        }
      });
    });

    it('should not shallow childrend component that is string', () => {
      expect(
        render(
          {
            props: {
              children: ['toto', undefined]
            }
          },
          {}
        )
      ).toEqual({
        props: {
          children: ['toto', undefined]
        }
      });
    });

    it('should not reShallow component already shallowed', () => {
      const constructorFlag = jest.fn();
      class ShallowComponent {
        constructor(reactEl, config) {
          constructorFlag(reactEl, config);
          this.props = {
            children: 'toto'
          };
        }
      }

      render(new ShallowComponent(), {}, ShallowComponent);

      expect(constructorFlag).toHaveBeenCalledTimes(1);
    });

    it('should shallow component if mock is defined', () => {
      const constructorFlag = jest.fn();
      class ShallowComponent {
        constructor(reactEl, config) {
          constructorFlag(reactEl, config);
        }
      }

      const MyCmp = () => <div/>;

      const config = {mocks: {MyCmp}};

      const shallowedApp = new ShallowComponent({}, config);
      shallowedApp.props = {children: {type: MyCmp}};

      render(shallowedApp, config, ShallowComponent);

      expect(constructorFlag).toHaveBeenCalledTimes(2);
    });
  });

  describe('update', () => {
    it('should not shallow component when it already mocked (mean having _mock in react El)', () => {
      const constructorFlag = jest.fn();
      class ShallowComponent {
        constructor(reactEl, config) {
          constructorFlag(reactEl, config);
        }
      }

      const MyCmp = () => <div/>;

      const config = {mocks: {MyCmp}};

      const shallowedApp = new ShallowComponent({}, config);
      shallowedApp.props = {
        children: {type: MyCmp, _mock: {_render: jest.fn()}}
      };

      render(shallowedApp, config, ShallowComponent);

      expect(constructorFlag).toHaveBeenCalledTimes(1);
    });

    it('should call _render function of the shallowedComponent on update', () => {
      const constructorFlag = jest.fn();
      class ShallowComponent {
        constructor(reactEl, config) {
          constructorFlag(reactEl, config);
        }
      }

      const MyCmp = () => <div/>;

      const config = {mocks: {MyCmp}};

      const shallowedApp = new ShallowComponent({}, config);
      shallowedApp.props = {
        children: {type: MyCmp, _mock: {_render: jest.fn()}}
      };

      render(shallowedApp, config, ShallowComponent);

      expect(shallowedApp.props.children._mock._render).toHaveBeenCalledTimes(
        1
      );
    });
  });
});
