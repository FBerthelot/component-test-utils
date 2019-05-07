## setProps()

- Arguments:
  - {object} props The new props to send to the component

### Example

#### React

```jsx
const Component = ({nbPost, nbLikes}) => {
  return (
    <div>
      {nbPost} - {nbLikes}
    </div>
  );
};

const cmp = shallow(<Component nbPost={4} nbLikes={20} />);

expect(cmp.html()).toBe('<div>4 - 20</div>');

cmp.setProps({
  nbPost: 42,
  nbLikes: 65
});

expect(cmp.html()).toBe('<div>42 - 65</div>');
```
