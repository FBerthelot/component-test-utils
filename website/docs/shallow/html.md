## html()

This method return the html() of the component in a String.

- Returns: {string} the markup

### Example

#### with react

```jsx
const Hello = ({name}) => {
  return <div>Hello World, {name}</div>;
};

const component = shallow(<Hello />, {props: {name: 'test'}});

component.html(); // "<div>Hello World, test</div>"
```

#### with angular

```ts
import 'core-js/es7/reflect';
import {Component} from '@angular/core';
import {shallow} from 'component-test-utils-angular';

@Component({
  selector: 'component',
  template: '<h1>Hello test world</h1>'
})
class MyComponent {}

const cmp = shallow(MyComponent);
cmp.html(); // "<h1>Hello test world</h1>"
```
