const merge = require('webpack-merge');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const baseWebpackConfig = require('./webpack.config.base');
const path = require('path');
const PORT = process.env.PORT || 3001;

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

const devWebpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  devtool: '#source-map',
  entry: {
    index: resolve('example/index.js')
  },
  devServer: {
    hot: true,
    port: PORT,
    open: true
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: resolve('public/index.html'),
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true
      }
    })
  ]
})

module.exports = devWebpackConfig;
