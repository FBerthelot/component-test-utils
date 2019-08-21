const React = require('react');
const {getTagName} = require('./getTagName');

describe('getTagName', () => {
  it('should return empty string when no argument is given', () => {
    expect(getTagName()).toBe('');
  });

  it('should return empty string when object is empty', () => {
    expect(getTagName({})).toBe('');
  });

  it('should return the tagname for plain html', () => {
    expect(getTagName({type: 'button'})).toBe('button');
  });

  it('should return the tagname for plain html', () => {
    expect(getTagName(<>toto</>)).toBe('');
  });

  it('should return the displayName if exist', () => {
    expect(getTagName({
      type: {
        displayName: 'displayName',
        name: 'originalName'
      }
    })).toBe('displayName');
  });

  it('should return the name when no displayName is present', () => {
    expect(getTagName({
      type: {
        name: 'originalName'
      }
    })).toBe('originalName');
  });

  it('should return the function name when nothing exist', () => {
    const toto = function () {};
    expect(getTagName({
      type: toto
    })).toBe('toto');
  });
});
