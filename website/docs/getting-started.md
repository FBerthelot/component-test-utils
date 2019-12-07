---
title: Getting Started
---

As each framework are different, the installation is different for each framework.
After that, the API will be the same, promise !


## React

### Installation

Start by installing dependencies with npm:

```sh
npm i -D component-test-utils-react
```

or with yarn:
```sh
yarn add -D component-test-utils-react
```

### Hello test world with jest

You can test everything work well by executing this test (with jest):

```jsx
import {shallow} from 'component-test-utils-react';

test('component-test-utils-react should work', () => {
  const Hello = () => <div>Hello</div>;
  const cmp = shallow(<Hello />);

  expect(cmp.html()).toBe('<div>Hello</div>');
});
```
