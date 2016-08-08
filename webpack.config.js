var webpack = require('webpack')
var path = require('path')

var config = {
  entry: [
    path.join(__dirname, 'app/app.jsx')
  ],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'app.js'
  },
  module: {
    loaders: [
      { test: /\.js$/,                   loaders: ['babel?cacheDirectory', 'strict'], exclude: /node_modules/ },
      { test: /\.jsx$/,                  loaders: ['babel?cacheDirectory', 'strict'], exclude: /node_modules/ },
    ]
  },
  resolve: {
    root: [
      path.join(__dirname, 'app')
    ],
    extensions: ['', '.js', '.jsx'],
    externals: ['node_modules/']
  }
}

module.exports = config;
