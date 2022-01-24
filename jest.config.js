const config = {
  collectCoverage: true,
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    "js/**/*.js",
    "!js/**/*.spec.js"
  ],
  coveragePathIgnorePatterns: [
    "/node_modules/",
  ],
  testResultsProcessor: "jest-sonar-reporter",
  coverageReporters: ['lcov']
}


module.exports = config;
