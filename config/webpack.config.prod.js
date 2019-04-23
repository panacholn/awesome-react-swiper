const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.config.base');
const path = require('path');

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

const prodWebpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  entry: {
    index: resolve('src/swiper.js')
  },
  externals: {
    'react': 'React',
    'react-dom' : 'ReactDOM'
  },
  output: {
    path: resolve('lib'),
    filename: 'index.js',
    library: 'Swiper',
    libraryTarget: 'umd'
  },
})

module.exports = prodWebpackConfig;
