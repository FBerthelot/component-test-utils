# component-test-utils
Test HTML component the same way, whenever the FrameWork (React, Angular, Vue.JS, Vanilla, ...)

[![npm Version](https://img.shields.io/npm/v/component-test-utils.svg)](https://www.npmjs.com/package/component-test-utils)
[![License](https://img.shields.io/npm/l/component-test-utils.svg)](https://www.npmjs.com/package/component-test-utils)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)

Component test utils is a JavaScript Utility that help you to interact with your component and get component's output.

## Purpose

Nowdays, testing component is commonly misunderstood.
Each big JavaScript FrameWork has is own way of testing.
It\'s confusing when you switch of FrameWork.

The goal of this tool is to have a opinated and unify way to test component disregarding the framework you use.

## How to test component ?

Before answer to this question, we need to answer to the question: "what is a component ?".

A component is a Custom HTML Component that produce a view (aka. a piece of others HTML Component).
To produce the view Component take properties and his internal state.

// TODO insert the schema of a component

So to sum up, a component is like a JavaScript function that take two arguments, the state and the props.

In most of the case it's ineffective to try change the state of the component manually.

## Example of a component test (with jest)

```javascript
import {shallow} from 'component-test-utils';

describe('like component', () => {
  it('should initialize button with properties', () => {
    const cmp = mount(`
      <likeButton></likeButton>
    `, {
      nbLikes: 18
    });

    expect(cmp.view()).toContain('18 likes');
  });

  it('should increment likes when clicking on the button ', () => {
    const cmp = mount(`
      <likeButton></likeButton>
    `, {
      nbLikes: 18
    });

    // before clicking mocking internal function that send a request
    cmp.mockState('likeTheTweet', jest.fn());

    cmp.view().find('button').click();
    cmp.update();

    expect(cmp.view()).toContain('19 likes');
  });

  it('should display children component (test transclusion)', () => {
    const cmp = mount(`
      <likeButton>
        <span>work with childrenslots/transclusion</span>
      </likeButton>
    `);

    expect(cmp.view().textContent()).toContain('work with children/slots/transclusion');
  });
});
```

## What is the kind of test I can do with component-test-utils ?

You can do both unit and integration test with component test-utils.
The only test type you cannot do is end-to-end testing because component-test-util rely on some mocking solution.

To have more information on testing, you can check these slides (in french) : https://slides.com/florentberthelot/test-composants-web#/
