const {shallow} = require('../shallow');
const React = require('react');

describe('shallow - react memo', () => {
  it('should render data', () => {
    const Component = React.memo(({data}) => {
      return data;
    });

    const cmp = shallow(<Component data="2"/>);

    expect(cmp.html()).toBe('2');
  });
});
