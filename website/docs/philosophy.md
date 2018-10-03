---
title: Philosophy about component testing
---

## How to test component ?

Before answer to this question, we need to answer to the question: "what is a component ?".

A component is a Custom HTML Component that produce a view (aka. a piece of others HTML Component).
To produce the view Component take properties and his internal state.

To sum up, a component is like a JavaScript function that take two arguments, the state and the props.

It's ineffective to try change the state of the component manually in test.

## What is the kind of test I can do with component-test-utils ?

You can do both unit and integration test with component test-utils.
The only test type you cannot do is end-to-end testing because component-test-util rely on some mocking solution.

To have more information on testing, you can check these slides (in french) : https://slides.com/florentberthelot/test-composants-web#/
