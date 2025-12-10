const path = require('path');

module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  devtool: process.env.NODE_ENV === 'production' ? false : 'source-map',
  optimization: { minimize: true },

  entry: {
    userScript: path.resolve(__dirname, 'src/index.js'),
    service: path.resolve(__dirname, 'service/index.js')
  },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  }
};
