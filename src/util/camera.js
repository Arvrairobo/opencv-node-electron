import cv from 'opencv';

const ratioCompress = 2;
const camWidth = 1080/ratioCompress;
const camHeight = 720/ratioCompress;

// initialize camera
const camera = new cv.VideoCapture(0);

camera.setWidth(camWidth);
camera.setHeight(camHeight);


export default camera;