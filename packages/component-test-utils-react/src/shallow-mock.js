const React = require('react');

const shallowMock = (reactEl, mocks, ShallowRender) => {
  if (!reactEl || typeof reactEl !== 'object') {
    return reactEl;
  }

  const shouldBeMocked =
    typeof reactEl.type === 'function' &&
    Object.keys(mocks).includes(reactEl.type.name);

  if (shouldBeMocked) {
    const shallowRender = new ShallowRender(
      React.createElement(
        mocks[reactEl.type.name],
        reactEl.props,
        reactEl.props && reactEl.props.children
      ),
      {mocks}
    );

    return {
      ...reactEl,
      props: {
        ...reactEl.props,
        children: shallowRender._rendered
      }
    };
  }

  if (reactEl.props && reactEl.props.children) {
    const children = Array.isArray(reactEl.props.children) ?
      reactEl.props.children.map(el => shallowMock(el, mocks, ShallowRender)) :
      shallowMock(reactEl.props.children, mocks, ShallowRender);

    return {
      ...reactEl,
      props: {
        ...reactEl.props,
        children
      }
    };
  }

  return reactEl;
};

exports.shallowMock = shallowMock;
