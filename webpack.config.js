const { resolve } = require('path');

// const isDev = (mode) => mode === 'development';
// const isProd = (mode) => mode === 'production';

module.exports = (_, argv) => ({
  entry: ['core-js/stable', 'regenerator-runtime', './app/index'],
  output: {
    filename: 'bundle.js',
    path: resolve('public')
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx']
  },
  mode: argv.mode,
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      }
    ]
  },
  stats: {
    colors: true
  }
});
