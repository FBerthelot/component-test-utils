## exists()

Method that check if element are render by the component.

### Example

#### React

```jsx
const MyComponent = () => (<div id="exist">hello world</div>);

const cmp = shallow(<MyComponent/>);


expect(cmp.querySelector('#exist').exists()).toBe(true);
expect(cmp.querySelector('#notExist').exists()).toBe(false);
```
