const {shallow} = require('../shallow');
const React = require('react');

describe('shallow - querySelector', () => {
  const initialState = {count: 0};
  const reducer = (state, action) => {
    switch (action.type) {
      case 'increment':
        return {count: state.count + 1};
      case 'decrement':
      default:
        return {count: state.count - 1};
    }
  };

  const Counter = () => {
    const [state, dispatch] = React.useReducer(reducer, initialState);
    return (
      <>
        Total : {state.count}
        <button type="button" onClick={() => dispatch({type: 'increment'})}>
          +
        </button>
        <button
          id="desc"
          type="button"
          onClick={() => dispatch({type: 'decrement'})}
        >
          -
        </button>
      </>
    );
  };

  it('should work with the useReducer hooks', () => {
    const cmp = shallow(<Counter/>);

    expect(cmp.html()).toBe(
      '<>Total : 0<button type="button" onClick="[onClick]">+</button><button id="desc" type="button" onClick="[onClick]">-</button></>'
    );

    // Add 1 to total
    cmp.querySelector('button').dispatchEvent('Click');

    expect(cmp.html()).toBe(
      '<>Total : 1<button type="button" onClick="[onClick]">+</button><button id="desc" type="button" onClick="[onClick]">-</button></>'
    );

    cmp.querySelector('#desc').dispatchEvent('Click');

    expect(cmp.html()).toBe(
      '<>Total : 0<button type="button" onClick="[onClick]">+</button><button id="desc" type="button" onClick="[onClick]">-</button></>'
    );
  });

  it('should display the view of the component when cannot find the element', () => {
    const cmp = shallow(<Counter/>);

    expect(() => {
      cmp.querySelector('yolo').dispatchEvent('yolo2');
    }).toThrow(
      '<>Total : 0<button type="button" onClick="[onClick]">+</button><button id="desc" type="button" onClick="[onClick]">-</button></>'
    );
  });

  it('should work with component deep in the tree with tag selector', () => {
    const Child = () => (<div><Counter/></div>);
    const Parent = () => (<div><Child/></div>);

    const cmp = shallow(<Parent/>, {mocks: {Child: true, Counter: true}});

    expect(cmp.querySelector('button').html()).toBe('<button type="button" onClick="[onClick]">+</button>');
  });

  it('should work with component deep in the tree with id selector', () => {
    const Child = () => (<div><Counter/></div>);
    const Parent = () => (<div><Child/></div>);

    const cmp = shallow(<Parent/>, {mocks: {Child: true, Counter: true}});

    expect(cmp.querySelector('#desc').html()).toBe('<button id="desc" type="button" onClick="[onClick]">-</button>');
  });

  it('should work with component with a custom displayName with tag selector', () => {
    const Child = () => (<div><Counter toto={false}/></div>);
    const Parent = () => (<div><Child/></div>);

    Counter.displayName = 'Counter2';

    const cmp = shallow(<Parent/>, {mocks: {Child: true, Counter: true}});

    expect(cmp.querySelector('Counter2').props.toto).toBe(false);
  });

  it('should find children rendered custom elements', () => {
    const ChildComponent1 = () => (<button type="button">0</button>);
    const ChildComponent2 = () => (<button type="button">1</button>);
    const ChildComponent3 = () => (<button type="button">3</button>);

    const Component = ({children}) => {
      return (
        <section id="post">
          <div>
            <span>yolo</span>
            {children}
          </div>
        </section>
      );
    };

    const cmp = shallow(
      <Component>
        <div>Test</div>
        <ChildComponent1/>
        <ChildComponent2/>
        <ChildComponent3/>
      </Component>
    );

    expect(cmp.querySelector('ChildComponent1').exists()).toBe(true);
  });
});
