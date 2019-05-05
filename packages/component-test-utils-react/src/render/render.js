const React = require('react');
const ReactIs = require('react-is');

const render = (reactEl, config, ShallowRender) => {
  if (!reactEl || typeof reactEl !== 'object') {
    return reactEl;
  }

  const isAlreadyMocked = Boolean(reactEl._mock);
  if (isAlreadyMocked) {
    reactEl._mock._render();
  }

  if (!isAlreadyMocked && ReactIs.isForwardRef(reactEl)) {
    const shallowRender = new ShallowRender(reactEl, config);

    return {
      ...shallowRender._rendered,
      _mock: shallowRender
    };
  }

  // When rendering modify the context value
  if (ReactIs.isContextProvider(reactEl) && reactEl.props.value) {
    reactEl.type._context._currentValue = reactEl.props.value;
  }

  const shouldBeMocked =
    typeof reactEl.type === 'function' &&
    (Object.keys(config.mocks).includes(reactEl.type.name) ||
      Object.keys(config.mocks).includes(reactEl.type.displayName));

  if (!isAlreadyMocked && shouldBeMocked) {
    const shallowRender = new ShallowRender(
      React.createElement(
        config.mocks[reactEl.type.displayName || reactEl.type.name],
        reactEl.props,
        reactEl.props && reactEl.props.children
      ),
      config
    );

    return {
      ...reactEl,
      props: {
        ...reactEl.props,
        children: render(shallowRender._rendered, config, ShallowRender)
      },
      _mock: shallowRender
    };
  }

  if (reactEl.props && reactEl.props.children) {
    const children = Array.isArray(reactEl.props.children) ?
      reactEl.props.children.map(el => render(el, config, ShallowRender)) :
      render(reactEl.props.children, config, ShallowRender);

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

exports.render = render;
