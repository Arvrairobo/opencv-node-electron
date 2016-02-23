var oxford = require('project-oxford'),
    client = new oxford.Client('945199da3c6e46d7b0d88e0875046f4e');
var camera = require('./camera');

module.exports = function (socket) {
    console.log('> get emotions');
    camera.read(function (err, im) {
        im.save('snapshot.png');
        console.log('snapshot.png');

        client.emotion.analyzeEmotion({
            path: 'snapshot.png'
        }).then(function (response) {
            socket.emit('emotions', response);
            console.log('> emmit emotions');
        });
    });
};