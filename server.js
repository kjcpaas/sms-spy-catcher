var WebpackDevServer = require("webpack-dev-server")
var webpack = require("webpack");

var webpackConfig = require("./webpack.config.js")
var websockets = require("./websockets")

var port = 8020
var compiler = webpack(webpackConfig)

var server = new WebpackDevServer(compiler, {
  hot: true,
  inline: true,
  contentBase: './public',
  historyApiFallback: true,
  noInfo: true
})

var socketServer = websockets.createServer()
socketServer.installHandlers(server.listeningApp, {prefix: '/ws'})

server.listen(port, 'localhost', (error) => {
  if (error) {
    console.error(error)
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
  }
})
