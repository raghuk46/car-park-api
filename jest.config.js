require('@babel/register');
require('@babel/polyfill');

module.exports = {
  verbose: true,
  globalSetup: './test/setup.js',
  globalTeardown: './test/teardown.js',
  testEnvironment: './test/test-environment.js',
  setupFilesAfterEnv: ['./test/jest.setup.js'],
  testMatch: ['**/__tests__/**/*.js', '**/?(*.)+(spec|test).js'],
  testPathIgnorePatterns: ['/node_modules/'],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**.js',
    '!**/utils/**',
    '!**/models/**',
    '!**/config/**',
    '!**/core/**',
    '!src/server.js',
  ],
  coverageThreshold: {
    global: {
      branches: 1,
      functions: 1,
      lines: 1,
      statements: 1,
    },
  },
};
