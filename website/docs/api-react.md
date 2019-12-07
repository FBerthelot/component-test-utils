## React specialty

### React context

When you want to test component that use a context, you can set while shallow the context using `externals` shallow constructor option.

### Example with jest

```jsx
const ThemeContext = React.createContext('light');

const ThemedButton = () => {
  const context = React.useContext(ThemeContext);
  return <div>{context}</div>;
};

const cmp = shallow(<ThemedButton/>, {
  externals: {
    contexts: [
      {id: ThemeContext, value: 'dark'}
    ]
  }
});

expect(cmp.html()).toBe(
  '<div>dark</div>'
);
```

### useDebugValue() hook

If you want to test that your component use this hook, you can set the debug option to true.

If the option is at true, useDebugValue will call `console.debug` function.

#### Example with jest

```jsx
it('should call console.debug', () => {
  console.debug = jest.fn();
  const Component = () => {
    React.useDebugValue('need to be logged');
    return <div />;
  };

  shallow(<Component />, {
    debug: true
  });

  expect(console.debug).toHaveBeenCalled();
});
```
