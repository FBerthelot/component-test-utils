const {shallow} = require('../shallow');
const React = require('react');

describe('shallow - react componentDidUpdate', () => {
  it('should call componentDidMount just after getSnapshotBeforeUpdate', () => {
    const orderTester = [];
    class Component extends React.Component {
      getSnapshotBeforeUpdate() {
        orderTester.push('getSnapshotBeforeUpdate');
      }

      componentDidUpdate() {
        orderTester.push('componentDidUpdate');
      }

      render() {
        orderTester.push('render');
        return <div/>;
      }
    }

    const cmp = shallow(<Component/>);
    cmp.setProps({value: 42});

    expect(orderTester).toEqual([
      'render',
      'render',
      'getSnapshotBeforeUpdate',
      'componentDidUpdate'
    ]);
  });

  it('should call getSnapshotBeforeUpdate with prevProps and prevState and result from snapshot', () => {
    let args;
    class Component extends React.Component {
      constructor(props) {
        super(props);
        this.state = {};
        this.handleClick = this.handleClick.bind(this);
      }

      getSnapshotBeforeUpdate() {
        return 69;
      }

      componentDidUpdate(...a) {
        args = a;
      }

      handleClick() {
        this.setState({
          nextState: true
        });
      }

      render() {
        return (
          <div onClick={this.handleClick}>
            {this.props.value} {this.state.nextState}
          </div>
        );
      }
    }

    const cmp = shallow(<Component value={1}/>);

    cmp.setProps({value: 42});

    expect(args).toEqual([{value: 1}, {}, 69]);

    cmp.dispatchEvent('Click');

    expect(args).toEqual([{value: 42}, {}, 69]);
  });
});
