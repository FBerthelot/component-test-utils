const {getTagName} = require('../methods/getTagName');

exports.shouldBeRender = (reactEl, config) => {
  // If reactEl is not a function, nothing to mock
  if (typeof reactEl.type !== 'function') {
    return false;
  }

  const mockList = config.mocks || [];

  const componentName = getTagName(reactEl);
  const isInMockList = Object.keys(mockList).includes(componentName);

  if (!isInMockList && config.blackList) {
    return true;
  }

  if (isInMockList) {
    // Do no mock if mock is falsy
    return Boolean(mockList[componentName]);
  }

  return false;
};
