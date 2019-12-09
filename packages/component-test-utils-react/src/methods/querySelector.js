const React = require('react');
const {getTagName} = require('./getTagName');
const {EmptyShallowedComponent} = require('../emptyShallow');
const isIDselectorRegex = /^#(.*)/;
const isClassSelectorRegex = /^\.(.*)/;

const isSelectedObject = (elem, selectorTree) => {
  if (typeof elem !== 'object') {
    return {
      selectorFullMatch: false,
      newSelectorTree: selectorTree
    };
  }

  let lastValueMatch = false;
  const newSelectorTree = selectorTree
    .map((selector, index) => {
      if (
        selector.isAlreadyFound ||
        (selectorTree[index - 1] && !selectorTree[index - 1].isAlreadyFound)
      ) {
        return selector;
      }

      const isMatchCurrentSelector =
        selector.isIdSelector ?
          elem.props && elem.props.id === selector.value :
          selector.isClassSelector ?
            elem.props && elem.props.className && new RegExp(` ${selector.value} `).test(` ${elem.props.className} `) :
            getTagName(elem) === selector.value;

      const isLastSelector = selectorTree.length === index + 1;
      lastValueMatch = isLastSelector && isMatchCurrentSelector;

      return {
        ...selector,
        // If it's last value never set it as isAlreadyFound
        isAlreadyFound: isLastSelector ? false : isMatchCurrentSelector
      };
    });

  return {
    selectorFullMatch: lastValueMatch,
    newSelectorTree
  };
};

function findElements(shallowedComponent, selectorTree) {
  const result = [];

  const {selectorFullMatch, newSelectorTree} = isSelectedObject(shallowedComponent, selectorTree);
  if (selectorFullMatch) {
    result.push(shallowedComponent);
  }

  // When component is an array, check if wanted compoent is between each element
  if (Array.isArray(shallowedComponent)) {
    shallowedComponent.forEach(child => {
      findElements(child, newSelectorTree).forEach(el => result.push(el));
    });

    return result;
  }

  // When the children is not an array nor an object, impossible to target it
  if (
    shallowedComponent.props &&
    shallowedComponent.props.children
  ) {
    if (Array.isArray(shallowedComponent.props.children)) {
      shallowedComponent.props.children.forEach(child => {
        findElements(child, newSelectorTree).forEach(el => result.push(el));
      });
    } else {
      findElements(shallowedComponent.props.children, newSelectorTree).forEach(el => result.push(el));
    }
  }

  return result;
}

const extractSelectorTree = selector => {
  return selector.split(' ')
    .filter(v => v)
    .map(selector => {
      const matchId = selector.match(isIDselectorRegex);
      const matchClass = selector.match(isClassSelectorRegex);

      const isClassSelector = Boolean(matchClass);
      const isIdSelector = Boolean(matchId);

      return {
        isIdSelector,
        isClassSelector,
        value:
          isIdSelector ?
            matchId[1] :
            isClassSelector ?
              matchClass[1] :
              selector
      };
    });
};

exports.querySelector = (shallowedComponent, selector, ShallowRender, getView) => {
  const targetedComponents = findElements(shallowedComponent, extractSelectorTree(selector));
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
