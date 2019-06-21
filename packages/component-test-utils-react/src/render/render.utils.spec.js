const {shouldBeRender} = require('./render.utils');

describe('react render utils', () => {
  describe('shouldBeRender', () => {
    let reactEl;
    let config;
    beforeEach(() => {
      function Toto() {}

      reactEl = {
        type: Toto
      };
      config = {
        mocks: {
          Toto: true
        }
      };
    });

    it('should return false when reactEl.type is not a function', () => {
      reactEl.type = 'string';
      expect(shouldBeRender(reactEl, config)).toBe(false);
    });

    it('should return true when reactEl.type is a function and config.mock defined a mock for it', () => {
      expect(shouldBeRender(reactEl, config)).toBe(true);
    });

    it('should return false when mock list is empty', () => {
      config.mocks = {};
      expect(shouldBeRender(reactEl, config)).toBe(false);
    });

    it('should return true when displayName match mocks list', () => {
      function Yolo() {}
      Yolo.displayName = 'Toto';

      expect(shouldBeRender({type: Yolo}, config)).toBe(true);
    });

    it('should return false when displayName not match mocks list', () => {
      function Toto() {}
      Toto.displayName = 'Yoto';

      expect(shouldBeRender({type: Toto}, config)).toBe(true);
    });

    it('should return true when mock list is empty and blackListMode is on', () => {
      config.mocks = {};
      config.blackList = true;
      expect(shouldBeRender(reactEl, config)).toBe(true);
    });

    it('should return false when mock given in config is false', () => {
      config.mocks = {
        Toto: false
      };
      expect(shouldBeRender(reactEl, config)).toBe(false);
    });
  });
});
