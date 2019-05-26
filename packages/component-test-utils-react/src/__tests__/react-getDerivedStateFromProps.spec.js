const {shallow} = require('../shallow');
const React = require('react');

describe('shallow - react getDerivedStateFromProps', () => {
  it('should call getDerivedStateFromProps before a changement of props', () => {
    class Component extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          initialState: 42
        };
      }

      static getDerivedStateFromProps(props) {
        return {iAmDerivedFromAProps: props.value + 1};
      }

      render() {
        return (
          <div>
            {this.state.iAmDerivedFromAProps} + {this.state.initialState}
          </div>
        );
      }
    }

    const cmp = shallow(<Component value={1}/>);

    cmp.setProps({value: 42});

    expect(cmp.html()).toBe('<div>43 + 42</div>');
  });

  it('should call getDerivedStateFromProps function on mounting', () => {
    class Component extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          initialState: 42
        };
      }

      static getDerivedStateFromProps(props) {
        return {iAmDerivedFromAProps: props.value + 1};
      }

      render() {
        return (
          <div>
            {this.state.iAmDerivedFromAProps} + {this.state.initialState}
          </div>
        );
      }
    }

    const cmp = shallow(<Component value={1}/>);

    expect(cmp.html()).toBe('<div>2 + 42</div>');
  });
});
