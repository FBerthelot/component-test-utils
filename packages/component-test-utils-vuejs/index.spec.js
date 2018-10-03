const defaultExport = require('./index');
const {shallow} = defaultExport;

describe('component-test-utils-react', () => {
  it('should export by default an object with all methods', () => {
    expect(typeof defaultExport).toBe('object');

    expect(defaultExport.shallow).toBeDefined();
  });

  it('should export shallow method directly', () => {
    expect(typeof shallow).toBe('function');
  });
});
