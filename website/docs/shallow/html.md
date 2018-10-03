## ShallowedComponent.html()

This method return the html() of the component in a String.

Example with react:

```js
const Hello = ({name}) => {
  return <div>Hello World, {name}</div>;
};

const component = shallow(<Hello />, {props: {name: 'test'}});

component.html(); // "<div>Hello World, test</div>"
```
