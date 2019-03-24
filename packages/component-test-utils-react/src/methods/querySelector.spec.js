jest.mock('react', () => {
  return {
    createElement: jest.fn(element => {
      if (typeof element === 'function') {
        element();
      }

      return element;
    })
  };
});

const React = require('react');
const {querySelector} = require('./querySelector');
const {EmptyShallowedComponent} = require('../emptyShallow');

class ShallowRender {
  constructor(el, config) {
    this.el = el;
    this.config = config;
  }
}

describe('querySelector', () => {
  beforeEach(() => {
    React.createElement.mockClear();
  });

  it('Should return an EmptyShallowedComponent when component have no props', () => {
    const component = {};
    const result = querySelector(component, 'tagname', ShallowRender);

    expect(result instanceof EmptyShallowedComponent).toBe(true);
  });

  it('Should return null if component have no children', () => {
    const component = {props: {}};
    const result = querySelector(component, 'tagname', ShallowRender);

    expect(result instanceof EmptyShallowedComponent).toBe(true);
  });

  it('Should return null when children is not an element but a string', () => {
    const component = {props: {children: 'toto'}};
    const result = querySelector(component, 'tagname', ShallowRender);
    expect(result instanceof EmptyShallowedComponent).toBe(true);
  });

  it('Should return null when children not correspond', () => {
    const component = {props: {children: {type: 'toto'}}};
    const result = querySelector(component, 'tagname', ShallowRender);
    expect(result instanceof EmptyShallowedComponent).toBe(true);
  });

  it('Should create a wrapper component that return the selectected element', () => {
    const component = {props: {children: {type: 'tagname'}}};

    querySelector(component, 'tagname', ShallowRender);

    expect(React.createElement).toHaveBeenCalledTimes(2);
  });

  it('Should pass the config to the new shallowed component', () => {
    const component = {props: {children: {type: 'tagname'}}, _config: 'config'};

    const result = querySelector(component, 'tagname', ShallowRender);

    expect(result.config).toBe('config');
  });

  it('Should give the element into a wrapper', () => {
    const component = {props: {children: {type: 'tagname'}}, _config: 'config'};

    const result = querySelector(component, 'tagname', ShallowRender);

    expect(result instanceof ShallowRender).toBe(true);
  });
});
