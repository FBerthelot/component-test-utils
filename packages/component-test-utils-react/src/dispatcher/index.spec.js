const {createDispatcher} = require('./index');

describe('dispatcher', () => {
  let component;
  let dispatcher;

  beforeEach(() => {
    component = {
      _render: jest.fn()
    };
    dispatcher = createDispatcher(component);
  });

  describe('useState', () => {
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

  describe('useEffect', () => {
    it('should call useEffect on firstRender', () => {
      const useEffectFn = jest.fn();
      dispatcher.useEffect(useEffectFn);

      expect(useEffectFn).toHaveBeenCalledTimes(1);
    });

    it('should call useEffect each time a render apear when non memoization is set', () => {
      const useEffectFn = jest.fn();
      dispatcher.useEffect(useEffectFn);
      dispatcher._informDipatcherRenderIsDone();
      dispatcher.useEffect(useEffectFn);
      dispatcher._informDipatcherRenderIsDone();

      expect(useEffectFn).toHaveBeenCalledTimes(2);
      dispatcher.useEffect(useEffectFn);
      expect(useEffectFn).toHaveBeenCalledTimes(3);
    });

    it('should call useEffect when a render apear and when props changes', () => {
      const useEffectFn = jest.fn();
      dispatcher.useEffect(useEffectFn, [0, 1]);
      dispatcher._informDipatcherRenderIsDone();

      dispatcher.useEffect(useEffectFn, [0, 1]);
      dispatcher._informDipatcherRenderIsDone();

      expect(useEffectFn).toHaveBeenCalledTimes(1);

      dispatcher.useEffect(useEffectFn, [0, 2]);

      expect(useEffectFn).toHaveBeenCalledTimes(2);
    });
  });
});
