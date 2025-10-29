import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  verbose: true,
  bail: true,
  testPathIgnorePatterns: ['/node_modules/', '/build/'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/server/$1',
  },
};

export default config;
