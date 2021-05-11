const WS = require('ws');

const WS_PORT = 4000;

let socketServer;
if (!socketServer) {
    socketServer = new WS.Server({
        port: WS_PORT
    });

    socketServer.on('connection', function(client) {
        console.log('client connect');

        client.on('message', function(msg) {
            console.log('client message: ' + msg);
        })
    })

    console.log('WebSocket running port: ' + WS_PORT);
}

function broadcastAll(msg) {
    for (const client of socketServer.clients) {
      if (client.readyState === WS.OPEN) {
        client.send(msg);
      }
    }
  }

module.exports = {
    broadcastAll
}