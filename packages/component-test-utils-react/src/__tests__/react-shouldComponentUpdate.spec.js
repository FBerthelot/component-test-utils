const {shallow} = require('../shallow');
const React = require('react');

describe('shallow - react shouldComponentUpdate', () => {
  it('should call shouldComponentUpdate before rendering', () => {
    const orderTester = [];
    class Component extends React.Component {
      shouldComponentUpdate() {
        orderTester.push('shouldComponentUpdate');
        return false;
      }

      render() {
        orderTester.push('render');
        return <div>{this.props.value}</div>;
      }
    }

    const cmp = shallow(<Component value={1}/>);

    cmp.setProps({value: 42});

    expect(orderTester).toEqual(['render', 'shouldComponentUpdate']);
  });

  it('should not rerender if shouldComponentUpdate return false', () => {
    class Component extends React.Component {
      shouldComponentUpdate() {
        return false;
      }

      render() {
        return <div>{this.props.value}</div>;
      }
    }

    const cmp = shallow(<Component value={1}/>);

    cmp.setProps({value: 42});

    expect(cmp.html()).toEqual('<div>1</div>');
  });

  it('should rerender if shouldComponentUpdate return true', () => {
    class Component extends React.Component {
      shouldComponentUpdate() {
        return true;
      }

      render() {
        return <div>{this.props.value}</div>;
      }
    }

    const cmp = shallow(<Component value={1}/>);

    cmp.setProps({value: 42});

    expect(cmp.html()).toEqual('<div>42</div>');
  });

  it('should give nextProps and nextState to shouldComponentUpdate method', () => {
    let args;
    class Component extends React.Component {
      constructor(props) {
        super(props);
        this.state = {};
        this.handleClick = this.handleClick.bind(this);
      }

      shouldComponentUpdate(...a) {
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

    expect(args).toEqual([{value: 42}, {}]);

    cmp.dispatchEvent('Click');

    expect(args).toEqual([{value: 42}, {nextState: true}]);
  });
});
