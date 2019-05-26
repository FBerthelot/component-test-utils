const {shallow} = require('../shallow');
const React = require('react');

describe('shallow - react defaultProps', () => {
  it('should initialize component with default props', () => {
    const Component = ({value}) => <div>{value}</div>;

    Component.defaultProps = {
      value: 42
    };

    const cmp = shallow(<Component/>);

    expect(cmp.html()).toBe('<div>42</div>');
  });
});
