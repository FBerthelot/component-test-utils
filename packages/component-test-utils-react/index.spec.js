import lib, {shallow} from './index';

describe('component-test-utils-react', () => {
  it('should export by default an object with all methods', () => {
    expect(typeof lib.shallow).toBe('function');
  });

  it('should export shallow method directly', () => {
    expect(typeof shallow).toBe('function');
  });
});
