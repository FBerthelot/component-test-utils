const {shallow} = require('../shallow');
const React = require('react');

describe('shallow - react forceUpdate', () => {
  it('should trigger a render whenever shouldComponentUpdate return false', () => {
    class Component extends React.Component {
      shouldComponentUpdate() {
        return false;
      }

      render() {
        return <div onClick={() => this.forceUpdate()}>{this.props.value}</div>;
      }
    }

    const cmp = shallow(<Component value={1}/>);

    cmp.setProps({value: 42});
    cmp.dispatchEvent('Click');

    expect(cmp.html()).toEqual('<div onClick="[onClick]">42</div>');
  });
});
