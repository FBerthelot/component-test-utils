## React specialty

### React context

When you want to test component that use a context, you can set while shallow the context using `externals` shallow constructor option.

The `contexts` object can contain two values:
 - `id`: the same context identifier as in useContext.
 - `value`: the value of the context. You can give object, string, array, it's what you want to test.

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

Note: As react doesn't provide a better way to identify context, you have to import the real context in your test. If there is an other way to identify context, fill an issue and the API will be improved.

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
