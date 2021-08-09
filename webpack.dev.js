const webpack = require('webpack');
const base = require('./webpack.config');

const devConfig = {
  ...base,
  mode: 'development',
  devtool: 'source-map',
  watch: true,

  plugins: [new webpack.HotModuleReplacementPlugin()],

  devServer: {
    contentBase: ['./src', './public'],
    port: 3000,
    compress: true, // enable gzip compression
    hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
    https: false, // true for self-signed, object for cert authority
    noInfo: true, // only errors & warns on hot reload
    disableHostCheck: true,
  },
};

module.exports = devConfig;
