const {shallow} = require('../shallow');
const React = require('react');

describe('shallow - react componentDidMount', () => {
  it('should call component did mount after first render', () => {
    const orderTester = [];
    class Component extends React.Component {
      componentDidMount() {
        orderTester.push('componentDidMount');
      }

      render() {
        orderTester.push('render');
        return <div/>;
      }
    }

    shallow(<Component/>);

    expect(orderTester).toEqual(['render', 'componentDidMount']);
  });
});
