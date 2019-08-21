exports.EmptyShallowedComponent = class EmptyShallowedComponent {
  constructor(selector, view) {
    this.nodeNotExistError = new Error(
      `
      The node you try to access with "${selector}" selector does not exist

      ${view ? view : 'Your component render falsy value'}

      `
    );
  }

  get props() {
    throw this.nodeNotExistError;
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
