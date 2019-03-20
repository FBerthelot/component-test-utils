## shallow()

- Arguments:
  - {Component} component
  - {Object} options
- Returns: {ShallowedComponent} A component with all the methods

### options

The option object is a way to passing property or some other informations to build an component in the memory of a computer.

Here is the list of available options:

- {Object} `mocks` The key is the property name, and the value his value.

### Examples

#### react

```jsx
const ChildComponent = ({nbLikes}) => {
  return <button type="button">{nbLikes}</button>;
};

const Component = () => {
  return (
    <section id="post">
      <ChildComponent nbLikes={0} />
    </section>
  );
};

const cmp = shallow(<Component />, {
  mock: {
    ChildComponent
  }
});

expect(cmp.html()).toBe(
  '<section id="post"><ChildComponent nbLikes="0"><button type="button">0</button></ChildComponent></section>'
);
```
