const {shallow} = require('../shallow');
const React = require('react');

describe('shallow - exists', () => {
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

  it('should return true when queryselector find one element', () => {
    const cmp = shallow(<Counter/>);

    expect(cmp.querySelector('#desc').exists()).toBe(true);
  });

  it('should return true when queryselector didn\'t find one element', () => {
    const cmp = shallow(<Counter/>);

    expect(cmp.querySelector('#yolo').exists()).toBe(false);
  });
});
