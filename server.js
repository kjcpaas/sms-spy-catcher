var WebpackDevServer = require("webpack-dev-server")
var webpackConfig = require("./webpack.config.js")
var webpack = require("webpack");

var http = require("http")
var SockJS = require("sockjs");

var port = 8020
var compiler = webpack(webpackConfig)

var server = new WebpackDevServer(compiler, {
  hot: true,
  inline: true,
  contentBase: './public',
  historyApiFallback: true,
  noInfo: true
})

server.listen(port, 'localhost', (error) => {
  if (error) {
    console.error(error)
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
  }
})

//Websocket server
var sockjs = SockJS.createServer({ sockjs_url: 'http://cdn.jsdelivr.net/sockjs/1.0.1/sockjs.min.js' })

var handlers = {
  sms: (socket, data) => {
    console.info("======================================")
    console.info("Message received:")
    console.info("From: " + data.from)
    console.info("Body: " + data.body)
    console.info("======================================")
  }
}

sockjs.on('connection', (socket) => {
  console.info('socket connected')

  // This is just test message
  // TODO: send actual message from SMS spy
  var test = JSON.stringify({
    type: 'sms',
    data: {
      from: '+639063221097',
      body: 'Hello'
    }
  })
  socket.write(test)

  socket.on('data', (e) => {
    console.info('Received message: ' + e)
    message = JSON.parse(e)
    if(handlers[message.type]) {
      handlers[message.type](socket, message.data)
    }
  })

  socket.on('close', () => {
    console.info('socket disconnected')
  })
})

var wsServer = http.createServer();
sockjs.installHandlers(wsServer, {prefix: '/ws'})
wsServer.listen(9999, 'localhost', (error) => {
  if (error) {
    console.error(error)
  } else {
    console.info("==> Websocket listening on port 9999. Make your request to http://localhost:9999/ws")
  }
})
