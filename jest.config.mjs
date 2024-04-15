import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  dir: './',
});

/** @type {import('jest').Config} */
const config = {
  collectCoverageFrom: [
    'app/**/*.{js,jsx,ts,tsx}',
    '__tests__/**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
  ],
  clearMocks: true,
  collectCoverage: true,
  coverageReporters: ['html'],
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/.next/',
    '<rootDir>/.husky/',
    '<rootDir>/.vscode/',
    '<rootDir>/.swc/',
    '<rootDir>/.coverage/',
    '<rootDir>/eslint/',
    '<rootDir>/public/',
    '<rootDir>/src/',
  ],
  testMatch: [
    '<rootDir>/__tests__/**/*.js',
    '<rootDir>/__tests__/**/*.{spec,test}.js',
  ],
};

export default createJestConfig(config);
