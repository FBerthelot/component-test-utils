exports.dispatchEvent = (reactTree, eventName) => {
  reactTree.props[`on${eventName}`]();
};
