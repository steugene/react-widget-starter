const path = require('path');
const fs = require('fs');
const dts = require('dts-bundle');
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const base = require('./webpack.config');

// Plugin for merge all *.d.ts files in output
// eslint-disable-next-line @typescript-eslint/no-empty-function
function DtsBundlePlugin() {}
DtsBundlePlugin.prototype.apply = function (compiler) {
  compiler.hooks.done.tap('dts', () => {
    const rootDir = path.resolve(__dirname);
    const mainPath = `${rootDir}/lib/components`;

    dts.bundle({
      name: 'Menu',
      main: `${mainPath}/index.d.ts`,
      out: `${rootDir}/lib/index.d.ts`,
      removeSource: true,
      outputAsModuleFolder: true,
      indent: '  ',
    });

    fs.rmdirSync(`${mainPath}`, { recursive: true });
  });
};

const prodConfig = {
  ...base,
  mode: 'production',
  devtool: false,
  optimization: {
    minimize: true,
  },
};

prodConfig.plugins.push(new DuplicatePackageCheckerPlugin());
prodConfig.plugins.push(new DtsBundlePlugin());

module.exports = prodConfig;
