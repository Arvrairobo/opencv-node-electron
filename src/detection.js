var camera = require('./camera');

// camera properties
var camFps = 10;
var camInterval = 1000 / camFps;

// face detection properties
var rectColorFace = [0, 255, 0];
var rectColorEyes = [0, 0, 255];
var rectThicknessFace = 2;
var rectThicknessEyes = 1;


function detectFace(im, cb) {
    im.detectObject('./node_modules/opencv/data/haarcascade_frontalface_alt.xml', {}, function (err, faces) {
        if (err) throw err;
        for (var i = 0; i < faces.length; i++) {
            face = faces[i];
            im.rectangle([face.x, face.y], [face.width, face.height], rectColorFace, rectThicknessFace);
        }
        cb(im);
    });
}

function detectEyes(im, cb) {
    im.detectObject('./node_modules/opencv/data/haarcascade_eye.xml', {}, function (err, eyes) {
        if (err) throw err;
        for (var i = 0; i < eyes.length; i++) {
            eye = eyes[i];
            im.rectangle([eye.x, eye.y], [eye.width, eye.height], rectColorEyes, rectThicknessEyes);
        }
        cb(im);
    });
}


module.exports = function (socket) {
    setInterval(function () {
        camera.read(function (err, im) {
            if (err) throw err;
            detectFace(im, function (imWithFace) {
                detectEyes(imWithFace, function (imFinal) {
                    socket.emit('frame', {buffer: imFinal.toBuffer()});
                });
            });
        });
    }, camInterval);
};
