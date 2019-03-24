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

exports.querySelector = (shallowedComponent, selector, ShallowRender) => {
  // When the children is not an array nor an object, impossible to target it !
  if (
    !shallowedComponent.props ||
    !shallowedComponent.props.children ||
    typeof shallowedComponent.props.children !== 'object'
  ) {
    return new EmptyShallowedComponent(selector);
  }

  const {children} = shallowedComponent.props;

  const targetedComponent = Array.isArray(children) ?
    children.find(child => isSelectedObject(child, selector)) :
    isSelectedObject(children, selector) && children;

  if (!targetedComponent) {
    return new EmptyShallowedComponent(selector);
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
