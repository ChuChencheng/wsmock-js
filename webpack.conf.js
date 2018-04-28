const path = require('path')

module.exports = {
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
}
