const path = require('path')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = function (env, argv) {
  return {
    mode: 'production',
    entry: './src/wsmock.js',
    output: {
      filename: 'wsmock.js',
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
    plugins: [
      new BundleAnalyzerPlugin(),
    ],
  }
}
