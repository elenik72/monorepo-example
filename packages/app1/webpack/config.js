const plugins = require('./plugins')
const presets = require('./presets')

const { resolve } = require('path')

const absPath = process.env.PREFIX_PATH || ''

module.exports = {
  mode: 'development',
  name: '@monorepo/app1',
  target: 'web',
  context: resolve(absPath),
  entry: {
    app: [
      'webpack-hot-middleware/client?path=/__webpack_hmr_@monorepo/app1',
      resolve(absPath, 'src/app.js')
    ]
  },
  output: {
    filename: '[name].[contenthash].js',
    publicPath: "/",
    path: resolve(absPath, 'dist'),
  },
  module: {
    rules: [
      presets.js
    ]
  },
  plugins: [
    ...plugins.html,
    ...plugins.reload
  ],
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
}
