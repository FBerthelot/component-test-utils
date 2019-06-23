## props

Property of shallow object that expose property of the component

### Example

#### React

```jsx
const cmp = shallow(<Component prop1={42} prop="someData"/>);

cmp.setProps({
  prop1: 34
});

expect(cmp.props).toEqual({
  prop1: 34,
  prop: 'someData'
});
```
