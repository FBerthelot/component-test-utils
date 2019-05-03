const {getHtml} = require('./html');

exports.dispatchEvent = (reactTree, eventName) => {
  if (!reactTree.props[`on${eventName}`]) {
    throw new Error(
      `Cannot dispatch event "${eventName}" on this node : ${getHtml({
        ...reactTree,
        props: {
          ...reactTree.props,
          children: null
        }
      })}`
    );
  }

  reactTree.props[`on${eventName}`]();
};
