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
    'react': {
        root: 'React',
        commonjs: 'react',
        commonjs2: 'react',
        amd: 'react'
    },
    'react-dom' : {
        root: 'ReactDOM',
        commonjs: 'react-dom',
        commonjs2: 'react-dom',
        amd: 'react-dom'
    }
  },
  output: {
    path: resolve('lib'),
    filename: 'index.js',
    library: 'Swiper',
    libraryTarget: 'umd'
  },
})

module.exports = prodWebpackConfig;
