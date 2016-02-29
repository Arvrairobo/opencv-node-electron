import Camera from './../util/camera';

// camera properties
const camFps = 10;
const camInterval = 1000 / camFps;

// face detection properties
const rectColorFace = [0, 255, 0];
const rectColorEyes = [0, 0, 255];
const rectThicknessFace = 2;
const rectThicknessEyes = 1;

function detectFace(im) {
    return new Promise((resolve, reject) => {
        im.detectObject('./node_modules/opencv/data/haarcascade_frontalface_alt.xml',
            {},
            (err, faces) => {
                if (err) {
                    throw reject(err);
                }
                for (var i = 0; i < faces.length; i++) {
                    let face = faces[i];
                    im.rectangle(
                        [face.x, face.y],
                        [face.width, face.height],
                        rectColorFace,
                        rectThicknessFace
                    );
                }
                resolve(im);
            });
    })
}

function detectEyes(im) {
    return new Promise((resolve, reject) => {
        im.detectObject('./node_modules/opencv/data/haarcascade_eye.xml', {},
            (err, eyes) => {
                if (err) throw reject(err);
                for (var i = 0; i < eyes.length; i++) {
                    let eye = eyes[i];
                    im.rectangle(
                        [eye.x, eye.y],
                        [eye.width, eye.height],
                        rectColorEyes,
                        rectThicknessEyes
                    );
                }
                resolve(im);
            });
    })
}

export default function (socket) {
    setInterval(() => {
        Camera.read((err, im) => {
            if (err) throw err;
            detectFace(im)
                .then(imWithFace => socket.emit('frame', {buffer: imWithFace.toBuffer()}));
        });
    }, camInterval);
}
