const React = require('react');
const {EmptyShallowedComponent} = require('../emptyShallow');
const isIDselector = /^#(.*)/;

const isSelectedObject = (elem, selector) => {
  if (typeof elem !== 'object') {
    return false;
  }

  const matchId = selector.match(isIDselector);

  if (matchId) {
    return elem.props && elem.props.id === matchId[1];
  }

  // If tagname selector
  return elem.type === selector;
};

function findElements(shallowedComponent, selector) {
  const result = [];

  if (isSelectedObject(shallowedComponent, selector)) {
    result.push(shallowedComponent);
  }

  // When the children is not an array nor an object, impossible to target it
  if (
    shallowedComponent.props &&
    shallowedComponent.props.children
  ) {
    if (Array.isArray(shallowedComponent.props.children)) {
      shallowedComponent.props.children.forEach(child => {
        findElements(child, selector).forEach(el => result.push(el));
      });
    } else {
      findElements(shallowedComponent.props.children, selector).forEach(el => result.push(el));
    }
  }

  return result;
}

exports.querySelector = (shallowedComponent, selector, ShallowRender, getView) => {
  const targetedComponents = findElements(shallowedComponent, selector);
  const targetedComponent = targetedComponents[0];

  if (!targetedComponent) {
    return new EmptyShallowedComponent(selector, getView());
  }

  const WrapperComponent = () => {
    return React.createElement(
      targetedComponent.type,
      targetedComponent.props,
      targetedComponent.props && targetedComponent.props.children
    );
  };

  return new ShallowRender(
    React.createElement(WrapperComponent),
    shallowedComponent._config
  );
};
