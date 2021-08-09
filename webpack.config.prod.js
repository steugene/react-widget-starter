const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin');
const base = require('./webpack.config');

const prodConfig = {
  ...base,
  mode: 'production',
  devtool: false,
  optimization: {
    minimize: true,
  },
};

prodConfig.plugins.push(new DuplicatePackageCheckerPlugin());

module.exports = prodConfig;
