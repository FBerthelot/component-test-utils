const {shallow} = require('../shallow');
const React = require('react');

describe('shallow - react useDebugValue', () => {
  beforeEach(() => {
    console.initialDebug = console.debug;
    console.debug = jest.fn();
  });
  afterEach(() => {
    console.debug = console.initialDebug;
    delete console.initialDebug;
  });

  it('should call console.debug', () => {
    const Component = () => {
      React.useDebugValue('need to be logged');
      return <div/>;
    };

    shallow(<Component/>, {
      debug: true
    });

    expect(console.debug).toHaveBeenCalled();
  });

  it('should not call console.debug by default', () => {
    const Component = () => {
      React.useDebugValue('need to be logged');
      return <div/>;
    };

    shallow(<Component/>);

    expect(console.debug).not.toHaveBeenCalled();
  });
});
