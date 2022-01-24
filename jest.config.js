const config = {
  collectCoverage: true,
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    "js/**/*.js",
    "!js/**/*.spec.js"
  ],
  coveragePathIgnorePatterns: [
    "/node_modules/",
  ]
}


module.exports = config;
