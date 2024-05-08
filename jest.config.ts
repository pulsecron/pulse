import type { Config } from '@jest/types';
// Sync object
const config: Config.InitialOptions = {
  preset: 'ts-jest',
  reporters: ['default', 'jest-junit'],
};
export default config;
