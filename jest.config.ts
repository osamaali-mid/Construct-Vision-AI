import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  dir: './',
});

const config: Config = {
  clearMocks: true,
  roots: ['<rootDir>/app'],
  testRegex: '((\\.|/*.)(test))\\.[tj]sx?$',
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  coverageThreshold: {
    global: {
      branches: 80,
      lines: 80,
      functions: 80,
      statements: 80,
    },
    '**/*.tsx': {
      branches: 80,
      lines: 80,
      functions: 80,
      statements: 80,
    },
  },
  collectCoverageFrom: ['<rootDir>/app/**/*.{ts,tsx}', '!<rootDir>/app/**/types.ts'],
  moduleNameMapper: {
    '^@/components/(.*)$': '<rootDir>/app/components/ui/$1',
  },
};

export default createJestConfig(config);
