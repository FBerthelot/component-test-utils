exports.createDispatcher = () => {
  return {
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
    useState: initialState => {
      return [initialState];
    }
  };
};
