const {shallow} = require('../shallow');
const React = require('react');

describe('shallow - react useState', () => {
  const Component = () => {
    const [state, setState] = React.useState('initialState');
    const handleClick = () => {
      setState(prevState => `${prevState}+1`);
    };

    return <button type="button" onClick={handleClick}>{state}</button>;
  };

  it('should return the initialState correctly', () => {
    const cmp = shallow(<Component/>);

    expect(cmp.html()).toBe('<button type="button" onClick="[handleClick]">initialState</button>');
  });

  it('should update the state when cllicking on the button', () => {
    const cmp = shallow(<Component/>);

    cmp.dispatchEvent('click');

    expect(cmp.html()).toBe('<button type="button" onClick="[handleClick]">initialState+1</button>');
  });
});
