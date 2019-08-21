const ReactIs = require('react-is');

exports.getTagName = function (reactEl) {
  if (!reactEl || !reactEl.type) {
    return '';
  }

  if (typeof reactEl.type === 'string') {
    return reactEl.type;
  }

  if (ReactIs.isFragment(reactEl)) {
    return '';
  }

  return (
    reactEl.type.displayName ||
    reactEl.type.name ||
    reactEl.type.$$typeof.toString()
  );
};
