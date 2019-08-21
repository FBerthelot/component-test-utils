const {EmptyShallowedComponent} = require('./emptyShallow');

describe('EmptyShallowedComponent', () => {
  it('should throw an error with the given selector when trying render html of the element', () => {
    expect(() => new EmptyShallowedComponent('selector1234').html()).toThrow(
      'selector1234'
    );
  });

  it('should throw an error with the given selector when trying querySelector', () => {
    expect(() =>
      new EmptyShallowedComponent('selector1234').querySelector('toto')
    ).toThrow('selector1234');
  });

  it('should throw an error with the given selector when trying dispatchEvent', () => {
    expect(() =>
      new EmptyShallowedComponent('selector1234').dispatchEvent('toto')
    ).toThrow('selector1234');
  });

  it('should throw an error with the given selector when trying dispatchEvent', () => {
    expect(() =>
      new EmptyShallowedComponent('selector1234').props.randomProps
    ).toThrow('selector1234');
  });

  it('should throw an error with the given selector when trying trigger', () => {
    expect(() =>
      new EmptyShallowedComponent('selector1234').trigger('toto')
    ).toThrow('selector1234');
  });

  it('should throw an error with the given selector when trying setProps', () => {
    expect(() =>
      new EmptyShallowedComponent('selector1234').setProps('toto')
    ).toThrow('selector1234');
  });

  it('should show the component view', () => {
    expect(() =>
      new EmptyShallowedComponent('selector1234', 'view4506').setProps('toto')
    ).toThrow('view4506');
  });

  it('should show a special message when the component view is falsy', () => {
    expect(() =>
      new EmptyShallowedComponent('selector1234').setProps('toto')
    ).toThrow('Your component render falsy value');
  });
});
