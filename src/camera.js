var cv = require('opencv');

var camWidth = 480;
var camHeight = 300;
// initialize camera
var camera = new cv.VideoCapture(0);

camera.setWidth(camWidth);
camera.setHeight(camHeight);


module.exports = camera;