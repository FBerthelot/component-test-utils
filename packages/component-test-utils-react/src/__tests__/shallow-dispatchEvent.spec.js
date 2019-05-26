const {shallow} = require('../shallow');
const React = require('react');

describe('shallow - trigger/dispatchEvent', () => {
  it('should also work with trigger allias', () => {
    const Component = () => {
      const [nbLikes, setNbLike] = React.useState(0);
      return (
        <button type="button" onClick={() => setNbLike(nbLikes + 1)}>
          {nbLikes}
        </button>
      );
    };

    const cmp = shallow(<Component/>);

    cmp.trigger('Click');

    expect(cmp.html()).toBe(
      '<button type="button" onClick="[onClick]">1</button>'
    );
  });

  it('should trigger click event on the button and update state', () => {
    const Component = () => {
      const [nbLikes, setNbLike] = React.useState(0);
      return (
        <button type="button" onClick={() => setNbLike(nbLikes + 1)}>
          {nbLikes}
        </button>
      );
    };

    const cmp = shallow(<Component/>);

    cmp.dispatchEvent('Click');

    expect(cmp.html()).toBe(
      '<button type="button" onClick="[onClick]">1</button>'
    );
  });

  it('should trigger click on a class component that use a setState object', () => {
    class Component extends React.Component {
      constructor(props) {
        super(props);
        this.state = {nbLikes: 0};
        this.handleClick = this.handleClick.bind(this);
      }

      handleClick() {
        this.setState({
          nbLikes: 42
        });
      }

      render() {
        return (
          <button type="button" onClick={this.handleClick}>
            {this.state.nbLikes}
          </button>
        );
      }
    }

    const cmp = shallow(<Component/>);
    cmp.dispatchEvent('Click');

    expect(cmp.html()).toBe(
      '<button type="button" onClick="[bound handleClick]">42</button>'
    );
  });

  it('should trigger click on a class component that use a setState function', () => {
    class Component extends React.Component {
      constructor(props) {
        super(props);
        this.state = {nbLikes: 0};
        this.handleClick = this.handleClick.bind(this);
      }

      handleClick() {
        this.setState(prevState => {
          return {
            nbLikes: prevState.nbLikes + 1
          };
        });
      }

      render() {
        return (
          <button type="button" onClick={this.handleClick}>
            {this.state.nbLikes}
          </button>
        );
      }
    }

    const cmp = shallow(<Component/>);

    cmp.dispatchEvent('Click');

    expect(cmp.html()).toBe(
      '<button type="button" onClick="[bound handleClick]">1</button>'
    );
  });

  it('should trigger click event and retrieve the good hook', () => {
    const Component = () => {
      const [nbPost, setNbPost] = React.useState(0);
      const [nbLikes, setNbLike] = React.useState(6);

      return (
        <button
          type="button"
          onClick={() => {
            setNbLike(nbLikes + 1);
            setNbPost(nbPost + 4);
          }}
        >
          {nbPost} - {nbLikes}
        </button>
      );
    };

    const cmp = shallow(<Component/>);

    cmp.dispatchEvent('Click');

    expect(cmp.html()).toBe(
      '<button type="button" onClick="[onClick]">4 - 7</button>'
    );
  });

  it('should work with a setState into a useEffect', () => {
    const Component = () => {
      const [nbPost, setNbPost] = React.useState(0);
      React.useEffect(() => setNbPost(1));

      return <div>{nbPost}</div>;
    };

    const cmp = shallow(<Component/>);

    expect(cmp.html()).toBe('<div>0</div>');
  });
});
