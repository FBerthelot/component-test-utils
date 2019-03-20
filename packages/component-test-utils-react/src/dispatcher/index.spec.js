const {createDispatcher} = require('./index');

describe('dispatcher', () => {
  describe('useState', () => {
    let component;
    let dispatcher;

    beforeEach(() => {
      component = {
        _render: jest.fn()
      };
      dispatcher = createDispatcher(component);
    });

    it('should use inistial value when first render', () => {
      expect(dispatcher.useState(0)[0]).toBe(0);
    });

    it('should trigger a render when ending the setState function', () => {
      const [, setState] = dispatcher.useState(0);
      setState(4);

      expect(component._render).toHaveBeenCalled();
    });

    it('should return the state when calling useState a second time', () => {
      const [initialState, setState] = dispatcher.useState(0);

      setState(4);
      dispatcher._informDipatcherRenderIsDone();

      const [finalState] = dispatcher.useState(0);

      expect(initialState).toBe(0);
      expect(finalState).toBe(4);
    });
  });
});
