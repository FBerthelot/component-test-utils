---
title: Getting Started
---

## React

Dtart by installing dependencies:
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
