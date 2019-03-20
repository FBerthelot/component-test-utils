const {dispatchEvent} = require('./dispatchEvent');

describe('dispatchEvent', () => {
  it('should export a function dispatch Event', () => {
    expect(typeof dispatchEvent).toBe('function');
  });
});
