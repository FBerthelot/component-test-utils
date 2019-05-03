const {Updater} = require('./updater');

describe('updater', () => {
  let shallowInstance;
  let publicInstance;
  beforeEach(() => {
    shallowInstance = {
      _render: jest.fn()
    };

    publicInstance = {
      state: {initialState: 45}
    };
  });

  describe('isMounted', () => {
    it('should return true if component is rendered', () => {
      shallowInstance._rendered = {};
      const updater = new Updater(shallowInstance);
      expect(updater.isMounted()).toBe(true);
    });

    it('should return true if component is rendered', () => {
      const updater = new Updater(shallowInstance);
      expect(updater.isMounted()).toBe(false);
    });
  });

  describe('enqueueForceUpdate', () => {
    it('should trigger a render', () => {
      const updater = new Updater(shallowInstance);
      updater.enqueueForceUpdate(publicInstance);

      expect(shallowInstance._render).toHaveBeenCalled();
    });
  });

  describe('enqueueReplaceState', () => {
    it('should trigger a render', () => {
      const updater = new Updater(shallowInstance);
      updater.enqueueReplaceState({}, {newState: 42});

      expect(shallowInstance._render).toHaveBeenCalled();
    });

    it('should replace state of the instance', () => {
      const updater = new Updater(shallowInstance);
      updater.enqueueReplaceState(publicInstance, {newState: 42});

      expect(publicInstance.state).toEqual({newState: 42});
    });
  });

  describe('enqueueSetState', () => {
    it('should trigger a render', () => {
      const updater = new Updater(shallowInstance);
      updater.enqueueSetState(publicInstance, {newState: 42});

      expect(shallowInstance._render).toHaveBeenCalled();
    });

    it('should not trigger a render when sending null', () => {
      const updater = new Updater(shallowInstance);
      updater.enqueueSetState(publicInstance, null);

      expect(shallowInstance._render).not.toHaveBeenCalled();
    });

    it('should not trigger a render when sending undefined', () => {
      const updater = new Updater(shallowInstance);
      updater.enqueueSetState(publicInstance);

      expect(shallowInstance._render).not.toHaveBeenCalled();
    });

    it('should merge state of the instance when givin an object', () => {
      const updater = new Updater(shallowInstance);
      updater.enqueueSetState(publicInstance, {newState: 42});

      expect(publicInstance.state).toEqual({initialState: 45, newState: 42});
    });

    it('should merge state of the instance when givin an function', () => {
      const updater = new Updater(shallowInstance);
      updater.enqueueSetState(publicInstance, prevState => ({
        initialState: prevState.initialState + 1
      }));

      expect(publicInstance.state).toEqual({initialState: 46});
    });
  });

  describe('_invokeCallbacks', () => {
    it('should call each given callback acumulated by enqueueSetState, enqueueReplaceState and enqueueForceUpdate', () => {
      const updater = new Updater(shallowInstance);

      const cb1 = jest.fn();
      const cb2 = jest.fn();
      const cb3 = jest.fn();

      updater.enqueueSetState(publicInstance, {newState: 42}, cb1);
      updater.enqueueReplaceState(publicInstance, {newState: 42}, cb2);
      updater.enqueueForceUpdate(publicInstance, cb3);

      updater._invokeCallbacks();

      expect(cb1).toHaveBeenCalledWith();
      expect(cb2).toHaveBeenCalledWith();
      expect(cb3).toHaveBeenCalledWith();
    });
  });
});
