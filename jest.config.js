const fs = require('fs')
 
const config = JSON.parse(fs.readFileSync(`${__dirname}/.swcrc`, 'utf-8'))
 
module.exports = {
  "testEnvironment": "jsdom",
  transform: {
    '^.+\\.(t|j)sx?$': ['@swc/jest', { ...config, /* custom configuration in Jest */ }],
  },
  setupFilesAfterEnv: ['./jest-setup.js']
}