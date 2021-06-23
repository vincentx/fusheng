const path = require('path')

module.exports = {
  rootDir: path.resolve(__dirname, './'),
  testMatch: [
    '<rootDir>/test/*.test.js'
  ]
}
