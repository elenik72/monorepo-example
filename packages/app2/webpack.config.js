const HtmlWebpackPlugin = require('html-webpack-plugin');
const { HotModuleReplacementPlugin } = require('webpack')
const { resolve } = require('path')

module.exports = {
  mode: 'development',
  name: '@monorepo/app2',
  context: __dirname,
  entry: {
    app: ['webpack-hot-middleware/client?path=/__webpack_hmr_@sphinx/hydra', './src/app.js']
  },
  output: {
    filename: '[name].[contenthash].js',
    publicPath: "/",
    path: resolve(__dirname, 'dist'),
  },
  target: 'web',
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              '@babel/preset-react'
            ]
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new HotModuleReplacementPlugin()
  ],
  devServer: {
    port: 8080,
    historyApiFallback: true
  },
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
