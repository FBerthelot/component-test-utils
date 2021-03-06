// The part of code should strictly follow the react dispatcher implementation as it's mainly a mock of it
// https://github.com/facebook/react/blob/master/packages/react/src/ReactHooks.js

class Dispatcher {
  /* ReadContext: () => {} */

  constructor(shallowedComponent) {
    this._hookStorage = [];
    this._firstCall = true;
    this._shallowedComponent = shallowedComponent;
    this._currentHookIndex = 0;
    this._isRendering = false;
  }

  _informDipatcherRenderIsComming() {
    this._isRendering = true;
  }

  _informDispatcherRenderIsDone() {
    this._currentHookIndex = 0;
    this._firstCall = false;
    this._isRendering = false;
  }

  _getHookIndex() {
    const hookIndex = this._currentHookIndex;
    this._currentHookIndex++;
    return hookIndex;
  }

  _isSameMemo(memo, hookIndex) {
    const haveMemo =
      this._hookStorage[hookIndex] && this._hookStorage[hookIndex].memo;

    return (
      haveMemo &&
      (this._hookStorage[hookIndex].memo === memo ||
        !this._hookStorage[hookIndex].memo.find(
          (runningMemo, i) => runningMemo !== memo[i]
        ))
    );
  }

  useState(initialState) {
    return this.useReducer(
      (prevState, arg) => {
        return typeof arg === 'function' ? arg(prevState) : arg;
      },
      initialState
    );
  }

  useEffect(fn, memo) {
    const hookIndex = this._getHookIndex();
    const haveSameMemo = this._isSameMemo(memo, hookIndex);

    if (!haveSameMemo) {
      this._hookStorage[hookIndex] = {memo};
      fn();
    }
  }

  useContext(context) {
    const contextOveride = this._shallowedComponent._config.externals &&
      this._shallowedComponent._config.externals.contexts &&
      this._shallowedComponent._config.externals.contexts.find(c => c.id === context);

    return contextOveride ? contextOveride.value : context._currentValue;
  }

  useReducer(reducer, initialState) {
    const hookIndex = this._getHookIndex();

    if (this._firstCall) {
      this._hookStorage.push(initialState);
    }

    return [
      this._hookStorage[hookIndex],
      action => {
        this._hookStorage[hookIndex] = reducer(
          this._hookStorage[hookIndex],
          action
        );
        // Updating the state trigger a render only while no rendering
        if (!this._isRendering) {
          this._shallowedComponent._render();
        }
      }
    ];
  }

  useCallback(fn, memo) {
    return this.useMemo(() => fn, memo);
  }

  useMemo(fn, memo) {
    const hookIndex = this._getHookIndex();
    const haveSameMemo = this._isSameMemo(memo, hookIndex);

    if (haveSameMemo) {
      return this._hookStorage[hookIndex].value;
    }

    const value = fn();
    this._hookStorage[hookIndex] = {memo, value};
    return value;
  }

  useRef(initialValue) {
    const hookIndex = this._getHookIndex();

    if (!this._hookStorage[hookIndex]) {
      this._hookStorage[hookIndex] = {
        current: initialValue
      };
    }

    return this._hookStorage[hookIndex];
  }

  useImperativeHandle(ref, objectBuilder, memo) {
    const hookIndex = this._getHookIndex();
    const haveSameMemo = this._isSameMemo(memo, hookIndex);

    if (haveSameMemo) {
      return;
    }

    this._hookStorage[hookIndex] = {memo};

    ref.current = {
      ...ref.current,
      ...objectBuilder()
    };
  }

  useLayoutEffect(...args) {
    return this.useEffect(...args);
  }

  useDebugValue(...args) {
    if (this.debug) {
      console.debug(...args);
    }
  }
}

exports.createDispatcher = shallowedComponent => {
  return new Dispatcher(shallowedComponent);
};
