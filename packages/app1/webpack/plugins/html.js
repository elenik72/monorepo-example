const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = process.env.PREFIX_PATH || ''

module.exports = [
  new HtmlWebpackPlugin({
    template: resolve(path, 'src/index.html'),
    inject: 'body'
  })
]
