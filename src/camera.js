var cv = require('opencv');

var ratioCompress = 2;
var camWidth = 1080/ratioCompress;
var camHeight = 720/ratioCompress;

// initialize camera
var camera = new cv.VideoCapture(0);

camera.setWidth(camWidth);
camera.setHeight(camHeight);


module.exports = camera;