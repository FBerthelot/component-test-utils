---
title: Announcing Beta of component-test-utils
author: Florent Berthelot
authorURL: http://twitter.com/berthel350
---

I've been working on this side-project for almost 1 year now and I think it's mature enough to go onto the next step: the official Beta!

I've never communicated about this library except to my closest co-workers and friends. So let's starts this year by releasing it!

## Why another testing library for React ?

There are two actors for testing React components:

- [Enzyme](https://airbnb.io/enzyme/)
- [React-testing-library](https://github.com/testing-library/react-testing-library)

They are great and I've used them on various projects, but I think there is a gap between which isn't filled.

Enzyme has an API that forces you to test components one by one, which is really great when you think about making unit tests small, independent and performant. However, when handling multiple components, the enzyme API is not well designed for that. You will have to pragmatically navigate between components, with `.dive` and so on... Moreover, Component-test-utils don't heavily rely on **react-test-renderer**, so I'm more free to design the API.

React-testing-library is the opposite of Enzyme. On one hand, it forces you not to mock anything. This way, you will test some patterns like HoC very easily, but on the other hand it's not very performant. Imagine if you wanted to test a component that has many many many sub-components, you'd have two solutions: to use a mocking system provided by a third-party library (jest ?) or not to not care about the time your unit test will take.

With component-test-utils-react, you have a fine control where your mock starts and where it finishes. This way you won't have to handle many `.dive` in your app nor to deal with many mocks `jest.mock('./anotherCmp', /**/)`.

Here is an example of testing with component-test-utils:

```jsx
const LikeButton = props => {
  return <button {...props}>+</button>;
};

const LikeDisplayer = () => {
  const [nbLikes, setNbLikes] = React.useState(0);
  const clickHandler = () => setNbLikes(nbLikes + 1);
  return (
    <p>
      {nbLikes} Like <LikeButton type="button" onClick={clickHandler}/>
    </p>
  );
};

const component = shallow(<LikeDisplayer/>, {
  mocks: {LikeButton}
  // The line above tell to component-test-utils-react to not mock LikeButton Component
});

component.querySelector('button').dispatchEvent('click');

const view = component.html();
// View === '<p>1 Like <LikeButton onClick="[clickHandler]"><button onClick="[clickHandler]">+</button></LikeButton></p>'

expect(view).toContain('1 Like');
expect(component.querySelector('button').props.type).toBe('button');
```

## Only React... for now!

When I started Component-test-utils I designed the API for testing components whatever the Framework used.

But then why support only React? Because, I had a very busy year 2019 with a lot of stuff to do like starting up my own company: WeFacto (there is no website for now). I've focused on React for the time being, in order to stabilize the API.

Proof of concept already exists in Vue.JS and Angular, so it only demands some extra work to implement the API. Feel free to contribute by providing PR to boost the project's progression.

## What's next?

Please, feel free to try out this library for your unit testing.

You can either directly follow the [getting started](/docs/getting-started) or if you don't know how to test components, you can start by checking out the [philosophy behind this API](/docs/philosophy).

I need feedback, so please feel free to give me yours on [my twitter](http://twitter.com/berthel350), or directly in the [Github issue](https://github.com/FBerthelot/component-test-utils/issues).

Let's make tests easy together!
