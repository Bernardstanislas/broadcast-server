const WebSocketServer = require('ws').Server;
const wss = new WebSocketServer({ port: 3000 });
 
wss.broadcast = data => {
  wss.clients.map(client => {
    client.send(data);
  });
};

wss.on('connection', ws => {
  ws.on('message', wss.broadcast);
});
