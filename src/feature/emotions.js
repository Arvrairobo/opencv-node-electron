import oxford from 'project-oxford';
import key from './../private/api';
import Camera from './../util/camera';

const client = new oxford.Client(key);

export default function (socket) {
    console.log('> get emotions');
    Camera.read(function (err, im) {
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