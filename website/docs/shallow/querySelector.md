## querySelector

- Arguments:

  - {string} selector css selector of first level work

- Returns: {ShallowComponent} The Element shallowed

### Example

#### React

```jsx
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

const cmp = shallow(<Counter />);

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
```
