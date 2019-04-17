module.exports = {
  preset: 'ts-jest/presets/js-with-babel',
  globals: {
    'ts-jest': {
      tsConfig: 'packages/component-test-utils-angular/tsconfig.json'
    }
  }
};
