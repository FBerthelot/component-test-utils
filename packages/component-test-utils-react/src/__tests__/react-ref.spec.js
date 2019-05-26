const {shallow} = require('../shallow');
const React = require('react');

describe('shallow - react ref', () => {
  it('should not ignore fowardref HOC', () => {
    const FancyButton = React.forwardRef((props, ref) => (
      <button ref={ref} className="FancyButton" type="button">
        {props.children}
      </button>
    ));

    const cmp = shallow(<FancyButton>test</FancyButton>);

    expect(cmp.html()).toBe(
      '<button class="FancyButton" type="button">test</button>'
    );
  });

  it('should work with foward ref', () => {
    const ref = React.createRef();

    const FancyButton = React.forwardRef((props, ref) => {
      return (
        <button ref={ref} className="FancyButton" type="button">
          {props.children}
        </button>
      );
    });

    const App = () => {
      return <FancyButton ref={ref}>Click me!</FancyButton>;
    };

    const cmp = shallow(<App/>, {
      mocks: {FancyButton}
    });

    expect(cmp.html()).toBe(
      '<button class="FancyButton" type="button">Click me!</button>'
    );
    expect(ref).toBe(cmp._rendered.ref);
  });
});
