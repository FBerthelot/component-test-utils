// The part of code should strictly follow the react dispatcher implementation as it's mainly a mock of it
// https://github.com/facebook/react/blob/master/packages/react/src/ReactHooks.js

class Dispatcher {
  /* ReadContext: () => {},
    useCallback: () => {},
    useContext: () => {},
    useDebugValue: () => {},
    useEffect: () => {},
    useImperativeHandle: () => {},
    useLayoutEffect: () => {},
    useMemo: () => {},
    useReducer: () => {},
    useRef: () => {}, */

  constructor(shallowedComponent) {
    this.states = [];
    this._firstCall = true;
    this._shallowedComponent = shallowedComponent;
    this._currentHookIndex = 0;
  }

  _informDipatcherRenderIsDone() {
    this._currentHookIndex = 0;
    this._firstCall = false;
  }

  _getHookIndex() {
    const hookIndex = this._currentHookIndex;
    this._currentHookIndex++;
    return hookIndex;
  }

  useState(initialState) {
    const hookIndex = this._getHookIndex();

    if (this._firstCall) {
      this.states.push(initialState);
    }

    return [
      this.states[hookIndex],
      newValue => {
        this.states[hookIndex] = newValue;
        // Updating the state trigger a render
        this._shallowedComponent._render();
      }
    ];
  }
}

exports.createDispatcher = shallowedComponent => {
  return new Dispatcher(shallowedComponent);
};
