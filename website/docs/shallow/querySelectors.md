## querySelectors

- Arguments:

  - {string} selector css selector of first level work

- Returns: {Array of ShallowComponent} The found Elements shallowed

### Example

#### React

```jsx
const Component = () => (
  <div className="container">
    <header>header content</header>
    <main>
      <div>main content</div>
      <svg id="image"/>
    </main>
  </div>
);

const cmp = shallow(<Component/>);

const foundElements = cmp.querySelectors('div');

expect(foundElements.length).toBe(2);
expect(foundElements[0].props.className).toBe('container');
expect(foundElements[1].html()).toBe('<div>main content</div>');
```
