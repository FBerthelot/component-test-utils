const React = require('react');
const {getHtml} = require('./methods/html');
const {shallowMock} = require('./shallow-mock');
const {createDispatcher} = require('./dispatcher/');
const {dispatchEvent} = require('./methods/dispatchEvent');

const {
  ReactCurrentDispatcher
} = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;

class ShallowRender {
  constructor(component, config = {}) {
    this._component = component;
    this._config = config;
    this._context = null;
    this._dispatcher = createDispatcher(this);

    this._render();

    // Render mocked component
    if (this._config.mock && this._rendered.props.children) {
      this._rendered = shallowMock(
        this._rendered,
        this._config.mock,
        ShallowRender
      );
    }
  }

  _render() {
    const prevDispatcher = ReactCurrentDispatcher.current;
    ReactCurrentDispatcher.current = this._dispatcher;

    this._rendered = this._component.type.call(
      undefined,
      this._component.props,
      this._context
    );

    // Finish recording the order of hooks by toogling this dispatcher property
    this._dispatcher._informDipatcherRenderIsDone();

    ReactCurrentDispatcher.current = prevDispatcher;
  }

  // Methods
  html() {
    return getHtml(this._rendered);
  }

  dispatchEvent(event) {
    return dispatchEvent(this._rendered, event);
  }

  // Alias for dispatchEvent
  trigger(event) {
    return dispatchEvent(this._rendered, event);
  }
}

exports.shallow = (component, config) => {
  return new ShallowRender(component, config);
};
