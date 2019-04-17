import defaultExport, {shallow} from './index';

describe('component-test-utils-angular', () => {
    it('should export by default an object with all methods', () => {
        expect(typeof defaultExport.shallow).toBe('function');
    });

    it('should export shallow method directly', () => {
        expect(typeof shallow).toBe('function');
    });
});
