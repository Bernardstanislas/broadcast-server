const WebSocketServer = require('ws').Server;
const winston = require('winston');

const wss = new WebSocketServer({ port: 3000 });
winston.level = 'debug';
 
wss.broadcast = data => {
  wss.clients.map(client => {
    client.send(data);
  });
};

wss.on('connection', ws => {
  winston.log('info', 'New connection');
  ws.on('message', msg => {
    winston.log('verbose', 'Message', msg);
    wss.broadcast(msg);
  });
});

winston.log('info', 'Websocket server started :)');
