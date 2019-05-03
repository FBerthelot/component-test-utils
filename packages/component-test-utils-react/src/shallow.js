const React = require('react');
const ReactIs = require('react-is');
const {getHtml} = require('./methods/html');
const {render} = require('./render/render');
const {createDispatcher} = require('./dispatcher/');
const {dispatchEvent} = require('./methods/dispatchEvent');
const {querySelector} = require('./methods/querySelector');
const {Updater} = require('./updater/updater');

const {
  ReactCurrentDispatcher
} = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;

const defaultConfig = {
  mocks: {}
};

class ShallowRender {
  constructor(component, config = defaultConfig) {
    this._component = component;
    this._config = config;
    this._dispatcher = createDispatcher(this);

    this._render();
  }

  _render(customProps) {
    const prevDispatcher = ReactCurrentDispatcher.current;
    ReactCurrentDispatcher.current = this._dispatcher;

    this._dispatcher.debug = Boolean(this._config.debug);

    this._dispatcher._informDipatcherRenderIsComming();

    let reactEl;

    const props = customProps || this._component.props;

    if (isClassComponent(this._component.type)) {
      if (!this._instance) {
        const updater = new Updater(this);
        // eslint-disable-next-line new-cap
        this._instance = new this._component.type(
          props,
          {},
          updater
        );
        this._instance.props = props;
        this._instance.state = this._instance.state || null;
        this._instance.updater = updater;
      }

      /*      If (typeof this._instance.componentWillMount === 'function') {
        this._instance.componentWillMount();
      }
*/

      reactEl = this._instance.render();
    } else if (ReactIs.isForwardRef(this._component)) {
      reactEl = this._component.type.render.call(
        undefined,
        props,
        this._component.ref
      );
    } else {
      reactEl = this._component.type.call(undefined, props);
    }

    this._rendered = render(reactEl, this._config, ShallowRender);

    // Finish recording the order of hooks by toogling this dispatcher property
    this._dispatcher._informDipatcherRenderIsDone();

    ReactCurrentDispatcher.current = prevDispatcher;

    // Pop all callback and invoke theme (only for class components)
    if (this._instance) {
      this._instance.updater._invokeCallbacks();
    }
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

  setProps(props) {
    this._render(props);
  }

  querySelector(selector) {
    return querySelector(this._rendered, selector, ShallowRender);
  }
}

exports.shallow = (component, config) => {
  return new ShallowRender(component, config);
};

function isClassComponent(Component) {
  return Boolean(Component.prototype && Component.prototype.isReactComponent);
}
