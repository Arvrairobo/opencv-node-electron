const express = require('express');
const http = require('http');

const app = express();

var server = http.createServer(app);

server.listen(3000, function () {
    console.log('HTTP server listening on port 3000');
});

// WebSocket server
var io = require('socket.io')(server);

io.on('connection', require('./detection'));


server.getEmotions = function () {
    require('./emotions')(io);
};

module.exports = server;
