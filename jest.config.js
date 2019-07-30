
module.exports = {
   verbose: true,
   globals: {
      "NODE_ENV": "test"
   },
   clearMocks: true,
   coverageDirectory: "coverage",
   testEnvironment: "node",
   transform: {
      "^.+\\.jsx?$": "babel-jest"
   },
   moduleFileExtensions: [
      "js"
   ],
   moduleDirectories: [
      "node_modules",
      "src/",
   ]
};