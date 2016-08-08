var webpack = require('webpack')
var path = require('path')

var BUILD_DIR = path.join(__dirname, 'public')
var APP_DIR = path.join(__dirname, 'app');

var config = {
  entry: {
    app: 'app.jsx'
  },
  output: {
    path: BUILD_DIR,
    filename: 'app.js'
  },
  module: {
    loaders: [
      { test: /\.js$/,                   loaders: ['babel?cacheDirectory', 'strict'], exclude: /node_modules/ },
      { test: /\.jsx$/,                  loaders: ['babel?cacheDirectory', 'strict'], exclude: /node_modules/ },
    ],
  },
  resolve: {
    root: [
      path.join(__dirname, 'app')
    ]
  }
}

module.exports = config;
