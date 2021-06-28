const path = require('path');
const CopyRightWebpackPlugin = require('./plugins/copy-right-webpack-plugin');
const MdHtmlWebpackPlugin = require('./plugins/md-html-webpack-plugin/md-html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    main: path.resolve(__dirname, './src/index.js'),
  },
  plugins: [
    new CopyRightWebpackPlugin({
      name: 'wangHaoYu',
    }),
    new MdHtmlWebpackPlugin({
      template: path.resolve(__dirname, './demo/index.md'),
      filename: 'index.md',
    }),
  ],
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js',
  },
};
