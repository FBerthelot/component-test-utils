const {shallow} = require('../shallow');
const React = require('react');

describe('shallow - react useCallback', () => {
  it('should call the callback', () => {
    const Component = () => {
      const callback = React.useCallback(() => {
        return 5;
      }, []);

      return callback();
    };

    const cmp = shallow(<Component/>);

    expect(cmp.html()).toBe('5');
  });
});
