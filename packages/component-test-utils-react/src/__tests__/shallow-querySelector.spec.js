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
});
