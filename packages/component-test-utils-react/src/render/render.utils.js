exports.shouldBeRender = (reactEl, config) => {
  // If reactEl is not a function, nothing to mock
  if (typeof reactEl.type !== 'function') {
    return false;
  }

  const mockList = config.mocks || [];

  const isInMockList = (
    Object.keys(mockList).includes(reactEl.type.name) ||
    Object.keys(mockList).includes(reactEl.type.displayName)
  );

  if (!isInMockList && config.blackList) {
    return true;
  }

  if (isInMockList) {
    const mock = mockList[reactEl.type.displayName] || mockList[reactEl.type.name];

    // Do no mock if mock is falsy
    return Boolean(mock);
  }

  return false;
};
