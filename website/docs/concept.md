---
title: Documentation
---

## Main concept of testing component

Unit testing component can be hard.

First thing to do is to understand what a component is.

// TODO illustration of a component.

When testing a component consider to expect change when changing parameter.
Component internal state never have to be accessed directly, you must always do check on HTML.
When you want test internal state, you only want to test the behavior of the component, so let's trigger some events on the interface !
