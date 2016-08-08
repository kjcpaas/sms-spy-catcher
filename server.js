var WebpackDevServer = require("webpack-dev-server")
var webpackConfig = require("./webpack.config.js")
var webpack = require("webpack");

var port = 8020
var compiler = webpack(webpackConfig)

var server = new WebpackDevServer(compiler, {
  hot: true,
  contentBase: './public'
})

server.listen(port, 'localhost', function(error) {
  if (error) {
    console.error(error)
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
  }
})
