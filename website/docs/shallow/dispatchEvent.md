## dispatchEvent()

You can also use the `trigger` alias.

- Arguments:
  - {string} event the event name
  - {any} options

### Example

#### React

```jsx
const Component = () => {
  const [nbLikes, setNbLike] = React.useState(0);
  return (
    <button type="button" onClick={() => setNbLike(nbLikes + 1)}>
      {nbLikes}
    </button>
  );
};

const cmp = shallow(<Component />);

cmp.dispatchEvent('click');
// cmp.trigger('click'); is equivalent

expect(cmp.html()).toBe('<button type="button" onClick="[onClick]">1</button>');
```
