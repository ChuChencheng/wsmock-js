const path = require('path')

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: './src/wsmock.js',
  output: {
    filename: 'wsmock.js',
    path: path.resolve(__dirname, 'dev'),
    library: 'WsMock',
    libraryTarget: 'umd',
    libraryExport: 'default',
  },
  devServer: {
    openPage: '/test'
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
}
