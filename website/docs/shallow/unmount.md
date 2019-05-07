## unmount()

Unmount a component. After unmounting a component shallow method will throw error.

### Example

#### React

```jsx
const orderTester = [];
class Component extends React.Component {
  render() {
    orderTester.push('render');
    return <div />;
  }

  componentWillUnmount() {
    orderTester.push('componentWillUnmount');
  }
}

const cmp = shallow(<Component />);

cmp.unmount();

expect(orderTester).toEqual(['render', 'componentWillUnmount']);
```
