---
title: Documentation
---

Component-test-utils is an opinionated test framework.

## What is component-test-utils

You have to think component-test-utils as a mock of your favorite framework.
The mock provide to you an extra-api to make test as easy as possible.
If you want to know more about component-test-utils, [read the philosophy part of this documentation.](./philosophy)

## Why should you use it ?

It mocks your favorite framework in a way that allows to write sustainable and functional oriented tests of your components.

Because component-test-utils consider each component as a black box, you won't be able to access your components state.
It will force you to make assertion on the generated view.


## Framework agnostic

Component-test-utils is designed to be framework agnostic. As long as you are building component, component-test-utils should provide to you the API to test it !

But in the other hand, the project is in an early stage and follow the need of the one that use it.
For now, only `React` is supported. If this API meet a need, then other library will be supported !
