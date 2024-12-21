export default {
  projects: [
    {
      displayName: 'backend',
      rootDir: './packages/backend',
      preset: 'ts-jest', // Use ts-jest for TypeScript support
      testEnvironment: 'node',
      extensionsToTreatAsEsm: ['.ts'], // Treat TypeScript files as ESM
      transform: {
        '^.+\\.tsx?$': ['ts-jest', { useESM: true }], // Move ts-jest config here
      },
    },
    {
      displayName: 'frontend',
      rootDir: './packages/frontend',
      preset: 'ts-jest',
      testEnvironment: 'jsdom', // Use jsdom for frontend testing
      extensionsToTreatAsEsm: ['.ts', '.tsx'],
      transform: {
        '^.+\\.tsx?$': ['ts-jest', { useESM: true }], // Move ts-jest config here
      },
    },
  ],
};
