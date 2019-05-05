export class Updater {
  constructor(shallow) {
    this._shallow = shallow;
    this._callbacks = [];
  }

  _enqueueCallback(callback, publicInstance) {
    if (typeof callback === 'function' && publicInstance) {
      this._callbacks.push({
        callback,
        publicInstance
      });
    }
  }

  _invokeCallbacks() {
    const callbacks = this._callbacks;
    this._callbacks = [];

    callbacks.forEach(({callback, publicInstance}) => {
      callback.call(publicInstance);
    });
  }

  isMounted() {
    return Boolean(this._shallow._rendered);
  }

  enqueueForceUpdate(publicInstance, callback) {
    this._enqueueCallback(callback, publicInstance);
    this._shallow._render(undefined, true);
  }

  enqueueReplaceState(publicInstance, completeState, callback) {
    this._enqueueCallback(callback, publicInstance);
    publicInstance.state = completeState;
    this._shallow._render();
  }

  enqueueSetState(publicInstance, setSateArg, callback) {
    this._enqueueCallback(callback, publicInstance);

    // Null and undefined are treated as no-ops.
    if (setSateArg === null || setSateArg === undefined) {
      return;
    }

    const newState =
      typeof setSateArg === 'function' ?
        setSateArg(publicInstance.state) :
        setSateArg;

    publicInstance.state = {
      ...publicInstance.state,
      ...newState
    };

    this._shallow._render();
  }
}
