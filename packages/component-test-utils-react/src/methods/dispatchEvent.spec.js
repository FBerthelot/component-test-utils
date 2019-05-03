const {dispatchEvent} = require('./dispatchEvent');

describe('dispatchEvent', () => {
  it('should export a function dispatch Event', () => {
    expect(typeof dispatchEvent).toBe('function');
  });

  it('should throw an error if method doesn\'t exist', () => {
    expect(() =>
      dispatchEvent(
        {
          type: {name: 'button'},
          props: {}
        },
        'click'
      )
    ).toThrow('dispatch');
  });
});
