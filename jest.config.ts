import type { Config } from 'jest';
import nextJest from 'next/jest';

const createJestConfig = nextJest({
  dir: './',
});

const config: Config = {
  clearMocks: true,
  roots: ['<rootDir>/src'],
  testRegex: '((\\.|/*.)(test))\\.[tj]sx?$',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  coverageProvider: 'v8',
  coverageDirectory: 'reports',
  coverageReporters: ['cobertura', 'html', 'lcov', 'text-summary', 'text'],
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/components/ui/*.{js,jsx,ts,tsx}',
    '!src/e2e/*.{js,jsx,ts,tsx}',
    '!src/sections/theme-toggle/theme-toggle.tsx',
    '!src/hooks/use-identity-iq/use-identity-iq.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 50,
      lines: 50,
      functions: 50,
      statements: 50,
    },
    'src/**/*.{js,jsx,ts,tsx}': {
      branches: 50,
      lines: 50,
      functions: 50,
      statements: 50,
    },
  },
  moduleNameMapper: {
    '^@/components/(.*)$': '<rootDir>/src/components/$1',
    '^@/hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^@/sections/(.*)$': '<rootDir>/src/sections/$1',
    '^@/utils/(.*)$': '<rootDir>/src/utils/$1',
    'ˆ@/app/(.*)$': '<rootDir>/src/app/$1',
  },
};

export default createJestConfig(config);
