module.exports = {
    transform: {
      "^.+\\.(js|jsx)$": "babel-jest"
      },
    transformIgnorePatterns: ['/node_modules/'],
    moduleFileExtensions: ['js', 'jsx'],
    moduleNameMapper: {
      '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    },
    extensionsToTreatAsEsm: ['.jsx'],
    testEnvironment: "jsdom",
    globals: {
      'process.env.NODE_ENV': 'test',
    },
    moduleNameMapper: {
      "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|css|scss)$": "<rootDir>/__mocks__/fileMock.js"
    }
    
  };
  