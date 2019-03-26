exports.EmptyShallowedComponent = class EmptyShallowedComponent {
  constructor(selector) {
    this.nodeNotExistError = new Error(
      `The node you try to access with "${selector}" selector does not exist`
    );
  }

  html() {
    throw this.nodeNotExistError;
  }

  dispatchEvent() {
    throw this.nodeNotExistError;
  }

  // Alias for dispatchEvent
  trigger() {
    throw this.nodeNotExistError;
  }

  setProps() {
    throw this.nodeNotExistError;
  }

  querySelector() {
    throw this.nodeNotExistError;
  }
};
