## shallow()

- Arguments:
  - {Component} component
  - {Object} Configuration object
- Returns: {ShallowedComponent} A component with all the methods

### Shallow Configuration Object

The option object is a way to passing property or some other informations to build an component in the memory of a computer.

Here is the list of available options:

- {Object} `mocks` The key is the property name, and the value his value.
- {Boolean} `blackList` If true each component will not be mocked as in default mode (whiteList). In this mode you will have to explicitly give to shallow configuration object the list of components to not mock.

### Examples

#### React

##### White list mode (default)

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

##### Black list mode


```jsx
const ChildrenComponent2 = () => {
  return 'yolooo';
};

const ChildrenComponent = () => {
  return (
    <div>
      <ChildrenComponent2/>
    </div>
  );
};

const ComponentParent = () => {
  return (
    <div>
      <ChildrenComponent/>
    </div>
  );
};

it('it should not mock anything', () => {
  const cmp = shallow(<ComponentParent/>, {
    blackList: true
  });

  expect(cmp.html()).toBe('<div><ChildrenComponent><div><ChildrenComponent2>yolooo</ChildrenComponent2></div></ChildrenComponent></div>');
});

it('it should only mock ChildrenComponent2', () => {
  const cmp = shallow(<ComponentParent/>, {
    mocks: {
      ChildrenComponent2: false
    },
    blackList: true
  });

  expect(cmp.html()).toBe('<div><ChildrenComponent><div><ChildrenComponent2/></div></ChildrenComponent></div>');
});
```
