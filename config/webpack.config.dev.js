const merge = require('webpack-merge');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const baseWebpackConfig = require('./webpack.config.base');
const path = require('path');
const PORT = process.env.PORT || 3000;

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

const devWebpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  entry: {
    index: resolve('example/index.js')
  },
  devServer: {
    hot: true,
    port: PORT,
    open: true
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      }
    ]
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