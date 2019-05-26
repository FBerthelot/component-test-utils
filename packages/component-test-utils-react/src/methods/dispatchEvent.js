const {getHtml} = require('./html');

exports.dispatchEvent = (reactTree, eventName) => {
  const eventNameCaseOk = `${eventName
    .charAt(0)
    .toUpperCase()}${eventName.slice(1)}`;

  if (!reactTree.props[`on${eventNameCaseOk}`]) {
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

  reactTree.props[`on${eventNameCaseOk}`]();
};
