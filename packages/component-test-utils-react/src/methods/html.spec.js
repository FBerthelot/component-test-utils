const {getHtml} = require('./html');

describe('react getHtml method', () => {
  it('should return empty string when no param', () => {
    expect(getHtml()).toBe('');
  });

  it('should return empty string when givin a boolean at true', () => {
    expect(getHtml(true)).toBe('');
  });

  it('should return empty string when givin a boolean at false', () => {
    expect(getHtml(false)).toBe('');
  });

  it('should return the number in string when param is a number', () => {
    expect(getHtml(0)).toBe('0');
  });

  it('should return the string when param is a number', () => {
    expect(getHtml('abcd')).toBe('abcd');
  });

  it('should return a inline tag when tag have no children and no props', () => {
    expect(getHtml({type: 'div'})).toBe('<div/>');
  });

  it('should return a inline tag with props when tag have no children but props', () => {
    expect(getHtml({type: 'div', props: {id: '50', 'data-toto': 'tata'}})).toBe(
      '<div id="50" data-toto="tata"/>'
    );
  });

  it('should return a inline tag with props when tag have no children but props when comonent is a function', () => {
    function MyCmp() {}
    expect(
      getHtml({
        type: MyCmp,
        props: {id: '50', 'data-toto': 'tata'}
      })
    ).toBe('<MyCmp id="50" data-toto="tata"/>');
  });

  it('should handle className for inline tag', () => {
    expect(getHtml({type: 'div', props: {className: '1 2 3'}})).toBe(
      '<div class="1 2 3"/>'
    );
  });

  it('should handle object element type', () => {
    expect(
      getHtml({
        type: {$$typeof: Symbol('React.Provider')}
      })
    ).toBe('<Symbol(React.Provider)/>');
  });

  it('should display children as well', () => {
    expect(
      getHtml({
        type: 'div',
        props: {
          id: '50',
          'data-toto': 'tata',
          children: {
            type: 'p',
            props: {
              yolo: 1,
              children: '0'
            }
          }
        }
      })
    ).toBe('<div id="50" data-toto="tata"><p yolo="1">0</p></div>');
  });

  it('should work when children is array', () => {
    expect(
      getHtml({
        type: 'div',
        props: {
          children: [
            {
              type: 'p',
              props: {
                yolo: 1,
                children: '0'
              }
            },
            {
              type: 'p',
              props: {
                yolo: 2,
                children: '1'
              }
            }
          ]
        }
      })
    ).toBe('<div><p yolo="1">0</p><p yolo="2">1</p></div>');
  });

  it('should work when children is array and function component', () => {
    function MyCmp() {}

    expect(
      getHtml({
        type: MyCmp,
        props: {
          children: [
            {
              type: 'p',
              props: {
                yolo: 1,
                children: '0'
              }
            },
            {
              type: MyCmp,
              props: {
                yolo: 2,
                children: '1'
              }
            }
          ]
        }
      })
    ).toBe('<MyCmp><p yolo="1">0</p><MyCmp yolo="2">1</MyCmp></MyCmp>');
  });
});
