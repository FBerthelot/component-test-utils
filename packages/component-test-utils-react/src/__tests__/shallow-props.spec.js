const {shallow} = require('../shallow');
const React = require('react');

describe('shallow - props', () => {
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

  it('it should give access to the given props', () => {
    const cmp = shallow(<Counter prop1={42} prop="someData"/>);

    expect(cmp.props).toEqual({
      prop1: 42,
      prop: 'someData'
    });
  });

  it('it should give access to the props after setProps', () => {
    const cmp = shallow(<Counter prop1={42} prop="someData"/>);

    cmp.setProps({
      prop1: 34
    });

    expect(cmp.props).toEqual({
      prop1: 34,
      prop: 'someData'
    });
  });

  it('it should give access to the props after a querySelector on element', () => {
    const cmp = shallow(<Counter prop1={42} prop="someData"/>);

    expect(cmp.querySelector('button').props.type).toBe('button');
  });
});
