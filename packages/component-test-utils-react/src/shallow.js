const React = require('react');
const {getHtml} = require('./methods/html');
const {shallowMock} = require('./shallow-mock');
const {createDispatcher} = require('./dispatcher/');

const {
  ReactCurrentDispatcher
} = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;

class ShallowRender {
  constructor() {
    this._context = null;
    this._dispatcher = createDispatcher();
  }

  shallow(reactElement, config = {}) {
    const prevDispatcher = ReactCurrentDispatcher.current;
    ReactCurrentDispatcher.current = this._dispatcher;

    this._currentlyRenderingComponent = reactElement.type;
    this._previousComponentIdentity = reactElement.type;

    this._rendered = reactElement.type.call(
      undefined,
      reactElement.props,
      this._context
    );

    // Render mocked component
    if (config.mock && this._rendered.props.children) {
      this._rendered = shallowMock(this._rendered, config.mock, ShallowRender);
    }

    ReactCurrentDispatcher.current = prevDispatcher;

    return {
      html: () => {
        return getHtml(this._rendered);
      }
    };
  }
}

exports.shallow = (component, config) => {
  return new ShallowRender().shallow(component, config);
};
