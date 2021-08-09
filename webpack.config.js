const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const src = path.join(__dirname, 'src');

module.exports = {
  entry: path.resolve('src', './index.tsx'),
  output: {
    filename: ({ chunk }) =>
      chunk.name === 'main' ? 'index.js' : '[name]/index.js',
    path: path.resolve('lib'),
    libraryTarget: 'umd',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.module.scss', '.svg'],
    alias: {
      components: path.join(src, 'components'),
      src: path.join(src),
    },
  },
  stats: {
    assets: true,
    colors: true,
    errors: true,
    errorDetails: true,
    modules: false,
    performance: true,
    hash: false,
    version: false,
    timings: true,
    warnings: true,
    children: false,
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js)$/,
        use: ['babel-loader', 'ts-loader'],
        include: path.join(__dirname, 'src'),
      },
      {
        test: /\.svg$/,
        loader: 'svg-url-loader',
      },
    ],
  },
  plugins: [new CleanWebpackPlugin()],
};
