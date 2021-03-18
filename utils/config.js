const path = require('path')
const yaml = require('js-yaml')
const fs = require('fs')

const getFileConfig = (filePath) => {
  try {
    const configByPath = path.resolve(filePath)
    const fileContent = fs.readFileSync(configByPath)

    return yaml.load(fileContent)
  } catch (e) {
    console.error(e)
  }
}

const getFile = (filePath) => {
  try {
    const configByPath = path.resolve(filePath)

    return require(configByPath)
  } catch (e) {
    console.error(e)
  }
}

module.exports = {
  getFileConfig,
  getFile
}
