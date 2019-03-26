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

  describe('useContext', () => {
    it('should return the current value of the context', () => {
      const contextValue = dispatcher.useContext({_currentValue: 42});
      expect(contextValue).toBe(42);
    });
  });
  describe('useReducer', () => {
    it('should return the initialState at the first render', () => {
      const initialState = {count: 0};
      const [state] = dispatcher.useReducer(jest.fn(), initialState);

      expect(state).toEqual(initialState);
    });

    it('should trigger a render if no currently render when dispatch', () => {
      const initialState = {count: 0};
      const [, dispatch] = dispatcher.useReducer(jest.fn(), initialState);

      dispatch({});

      expect(component._render).toHaveBeenCalledTimes(1);
    });

    it('should not trigger a render if no currently render when dispatch', () => {
      const initialState = {count: 0};
      const [, dispatch] = dispatcher.useReducer(jest.fn(), initialState);

      dispatcher._informDipatcherRenderIsComming();
      dispatch({});

      expect(component._render).toHaveBeenCalledTimes(0);
    });

    it('should update the state given the result of the function', () => {
      const initialState = {count: 0};
      const [state1, dispatch] = dispatcher.useReducer(
        (sate, action) => action,
        initialState
      );

      expect(state1.count).toBe(0);

      dispatcher._informDipatcherRenderIsDone();
      dispatch({count: 45});

      const [state2] = dispatcher.useReducer(arg => arg, initialState);

      expect(state2.count).toBe(45);
    });
  });
});

/* Const initialState = {count: 0};

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    default:
      throw new Error();
  }
}

function Counter({initialState}) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      Total : {state.count}
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
    </>
  );
} */
