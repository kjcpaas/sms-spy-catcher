exports.createServer = () => {
  var SockJS = require("sockjs");

  //Websocket
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

  return sockjs
}
