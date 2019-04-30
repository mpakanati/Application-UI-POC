// module.exports = {
// globals: {
//     "__TRANSFORM_HTML__": false
//   },
//   testMatch: ['**/+(*.)+(spec|test).+(ts|js)?(x)'],
//   transform: {
//     '^.+\\.(ts|js|html)$': 'jest-preset-angular/preprocessor.js'
//   },
//   resolver: '@nrwl/builders/plugins/jest/resolver',
//   moduleFileExtensions: ['ts', 'js', 'html'],
//   collectCoverage: true,
//   coverageReporters: ['html']
// };
module.exports = {
  "globals": {
    "ts-jest": {
      "tsConfigFile": "tsconfig.spec.json"
    },
    "__TRANSFORM_HTML__": true
  },
  verbose:true,
  testMatch: ['**/+(*.)+(spec|test).+(ts|js)?(x)'],
  transform: {
    '^.+\\.(ts|js|html)$': 'jest-preset-angular/preprocessor.js',
  },
  resolver: '@nrwl/builders/plugins/jest/resolver',
  moduleFileExtensions: ['ts', 'js', 'html'],
  collectCoverage: true,
  coverageReporters: ['html', "lcov","cobertura"],
  setupTestFrameworkScriptFile: "./src/test-setup.ts",
  reporters: [ "default", "jest-junit" ]
};
