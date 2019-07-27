const React = require('react');
const ReactIs = require('react-is');
const {shouldBeRender} = require('./render.utils');

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

  if (!isAlreadyMocked && shouldBeRender(reactEl, config)) {
    const mock = config.mocks && config.mocks[reactEl.type.displayName || reactEl.type.name];
    const el = mock === true ? reactEl.type : mock || reactEl.type;

    const shallowRender = new ShallowRender(
      React.createElement(
        el,
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
