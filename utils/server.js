/* eslint-disable security/detect-child-process */
const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const path = require('path')
const process = require('process')
const cp = require('child_process')
const {
  getFileConfig,
  getFile
} = require('./config')
const { logOutput } = require('./log')

const sphinxConfig = getFileConfig('./config.yaml')
const packages = Object.values(sphinxConfig.packages)
const app = express()
const PORT = process.env.PORT || 8080

const registerMiddleware = async (compiler, publicPath, configs, staticFilesPath) => {
  app.use(webpackDevMiddleware(compiler, { publicPath }))
  app.use(webpackHotMiddleware(compiler, { path: '/__webpack_hmr_' + configs.name }))
  // app.use(/^\/locales/, express.static(staticFilesPath))
}

const registerRequest = async (url, html, outputFile) => {
  app.get(url, (_, res, next) => {
    outputFile.readFile(html, (err, result) => {
      if (err) {
        return next(err)
      }
      res.set('content-type', 'text/html')
      res.send(result)
      res.end()
    })
  })
}

packages.forEach((configs) => {
  if (configs.commands) {
    const command = configs.commands
    command.forEach((command) => {
      const build = cp.spawn('yarn', ['workspace', configs.name, command])
      logOutput(build)
    })
  }
})

packages.forEach((configs) => {
  const prefixPath = path.join(sphinxConfig.workspaces, configs.dir)
  process.env.PREFIX_PATH = prefixPath

  const webpackConfig = getFile(configs.webpack)
  const {
    publicPath,
    path: outputPath
  } = webpackConfig.output
  const compilerWebpack = webpack(webpackConfig)
  const html = path.join(outputPath, 'index.html')
  const staticFilesPath = path.resolve(prefixPath, outputPath, 'locales')
  const url = new RegExp(configs.url_prefix)

  registerMiddleware(compilerWebpack, publicPath, configs, staticFilesPath)
  registerRequest(url, html, compilerWebpack.outputFileSystem)
})

app.listen(PORT, () => {
  console.log(`App listening to ${PORT}....`)
  console.log('Press Ctrl+C to quit.')
})
