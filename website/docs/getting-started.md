---
title: Getting Started
---

## React

Start by installing dependencies:
`npm i -D component-test-utils-react` with npm, or `yarn add -D component-test-utils-react` with yarn.

Then, you can test everything work well by executing this test (with jest) :

```jsx
import {shallow} from 'component-test-utils-react';

test('component-test-utils-react should work', () => {
  const Hello = () => <div>Hello</div>;
  const cmp = shallow(<Hello />);

  expect(cmp.html()).toBe('<div>Hello</div>');
});
```

## Angular

Start by installing dependencies:
`npm i -D component-test-utils-angular` with npm, or `yarn add -D component-test-utils-angular` with yarn.

Then, you can test everything work well by executing this test (with jest or jasmine) :

```jsx
import 'core-js/es7/reflect';

import {Component} from '@angular/core';

import shallow from './shallow';

@Component({
  selector: 'component',
  template: '<h1>Hello test world</h1>'
})
class MyComponent {}

describe('Angular shallow', () => {
  it('should return html', () => {
    const cmp = shallow(MyComponent, {debug: true});
    expect(cmp.html()).toBe('<h1>Hello test world</h1>');
  });
});
```
