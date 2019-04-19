## React specialty

### useDebugValue() hook

If you want to test that your component use this hook, you can set the debug option to true.

If the option is at true, useDebugValue will call `console.debug` function.

#### example with jest :

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
