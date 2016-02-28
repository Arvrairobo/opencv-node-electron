import express from 'express';
import http from 'http';
import detection from './../feature/detection';
import emotion from './../feature/emotions';

const app = express();

var server = http.createServer(app);

server.listen(3000, () => console.log('HTTP server listening on port 3000'));

// WebSocket server
var io = require('socket.io')(server);

io.on('connection', detection);

server.getEmotions = () => (emotion)(io);

export default server;
