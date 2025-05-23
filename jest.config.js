module.exports = {
  testEnvironment: 'jsdom', // run tests in browser-like environment
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], // run after environment setup
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest', // use babel-jest for JS/TS files
  },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  testPathIgnorePatterns: ['/node_modules/', '/.next/'], // ignore these folders
};
