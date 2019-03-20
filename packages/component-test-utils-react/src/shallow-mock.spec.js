const {shallowMock} = require('./shallow-mock');
const React = require('react');

class ShallowRender {
  constructor() {
    this._rendered = {
      type: 'div',
      props: {
        children: 'mocked'
      }
    };
  }
}

describe('react shallow mock', () => {
  let renderedCmp;
  beforeEach(() => {
    function MyCmp() {
      return <div>not mock</div>;
    }

    renderedCmp = {
      type: MyCmp,
      props: {}
    };
  });

  it('should not mock when there is no component sent', () => {
    expect(shallowMock()).toBe(undefined);
  });

  it('should not mock when component is a number', () => {
    expect(shallowMock(0)).toBe(0);
  });

  it('should not mock when component is a text', () => {
    expect(shallowMock('yolo')).toBe('yolo');
  });

  it('should not mock anything when there is no mock object', () => {
    expect(shallowMock(renderedCmp, {})).toEqual(renderedCmp);
  });

  it('should render the mock when there is no mock object', () => {
    const rendered = shallowMock(
      {
        type: 'div',
        props: {
          children: [renderedCmp, 'yoooo']
        }
      },
      {
        MyCmp: jest.fn()
      },
      ShallowRender
    );

    expect(rendered.props.children[1]).toBe('yoooo');
    expect(rendered.props.children[0].props.children).toEqual({
      type: 'div',
      props: {
        children: 'mocked'
      }
    });
  });

  it('should mock also when in an array of children', () => {
    expect(
      shallowMock(
        renderedCmp,
        {
          MyCmp: jest.fn()
        },
        ShallowRender
      ).props.children
    ).toEqual({
      type: 'div',
      props: {
        children: 'mocked'
      }
    });
  });
});
