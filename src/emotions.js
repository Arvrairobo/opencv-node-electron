var oxfordEmotion = require('node-oxford-emotion')('xx');
var camera = require('./camera');
var fs = require('fs');

function binaryRead(file) {
    var bitmap = fs.readFileSync(file);
    return new Buffer(bitmap.toString('binary'),'binary');
}

module.exports = function () {
    camera.read(function (err, im) {
        im.save('snapshot.png');

        oxfordEmotion.recognize("image", binaryRead('snapshot.png'), function(cb) {
            console.log(cb);
        });
    });
};