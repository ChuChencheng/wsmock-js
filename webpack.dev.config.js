const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = function (env, argv) {
  return {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: {
      main: './src/wsmock.js',
      index: './test/index.js',
      settings: './test/settings.js',
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dev'),
      library: 'WsMock',
      libraryTarget: 'umd',
      libraryExport: 'default',
    },
    devServer: {
      contentBase: path.resolve(__dirname, 'dev'),
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
    plugins: [
      new HtmlWebpackPlugin({
        template: './test/index.html',
      }),
      new BundleAnalyzerPlugin(),
    ],
  }
}
