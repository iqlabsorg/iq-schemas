/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testTimeout: 10000,
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  testMatch: ['<rootDir>/test/**/*.test.ts'],
};
