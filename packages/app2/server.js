const path = require('path')
const express = require('express')
// const config = require('./webpack.config')
// const webpack = require('webpack')
// const webpackDevMiddleware = require('webpack-dev-middleware')
// const webpackHotMiddleware = require('webpack-hot-middleware')

const app = express(),
  DIST_DIR = __dirname,
  HTML_FILE_HYDRA = path.join(DIST_DIR, './app1/dist/index.html'),
  HTML_FILE_CHIMERA = path.join(DIST_DIR, './app2/dist/index.html')
  // compiler = webpack(config)

// app.use(webpackDevMiddleware(compiler, {
//   publicPath: config.output.publicPath
// }))

// app.use(webpackHotMiddleware(compiler))

app.use(express.static(DIST_DIR + '/app1/dist'))
app.use(express.static(DIST_DIR + '/app2/dist'))

app.get('^/hydra', (req, res) => {
  res.sendFile(HTML_FILE_HYDRA)
})

app.get(/.*chimera$/, (req, res) => {
  res.sendFile(HTML_FILE_CHIMERA)
})

const PORT = 8080
app.listen(PORT, () => {
  console.log(`App listening to ${PORT}....`)
  console.log('Press Ctrl+C to quit.')
})
