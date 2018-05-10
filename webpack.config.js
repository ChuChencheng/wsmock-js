const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = function (env, argv) {
  return {
    mode: 'production',
    entry: {
      'wsmock': './src/wsmock.js',
      'wsmock.min': './src/wsmock.js',
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist'),
      library: 'WsMock',
      libraryTarget: 'umd',
      libraryExport: 'default',
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: "babel-loader",
        }
      ]
    },
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          include: /\.min\.js$/,
        })
      ]
    },
    plugins: [
      new CleanWebpackPlugin(['dist']),
    ],
  }
}
