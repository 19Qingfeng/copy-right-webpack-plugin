const path = require('path');
const CopyRightWebpackPlugin = require('./plugins/copy-right-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    main: path.resolve(__dirname, './src/index.js'),
  },
  plugins: [
    new CopyRightWebpackPlugin({
      name: 'wangHaoYu',
    }),
  ],
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js',
  },
};
