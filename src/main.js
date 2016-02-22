'use strict';

const express = require('express');
const http = require('http');
const electron = require('electron');
const Menu = require('menu');

// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow;

function createServer() {
    const app = express();

    var server = http.createServer(app);

    server.listen(3000, function () {
        console.log('HTTP server listening on port 3000');
    });
    // WebSocket server
    var io = require('socket.io')(server);

    io.on('connection', require('./socket'));
    // and load the index.html of the app.
}

function createWindow() {
    var menu = Menu.buildFromTemplate([
        {
            label: 'Menu',
            submenu: [
                {
                    label: 'Detect emotion',
                    selector: 'getEmotion:',
                    click: function(){
                        console.log('getEmotion')
                    }
                }, {
                    label: 'Quit', accelerator: 'CmdOrCtrl+Q',
                    click: function () {
                        app.quit();
                    }
                }
            ]
        }]);

    Menu.setApplicationMenu(menu);

    // Create the browser window.
    mainWindow = new BrowserWindow({width: 800, height: 600});

    mainWindow.loadURL('file://' + __dirname + '/index.html');

    // Open the DevTools.
    //mainWindow.webContents.openDevTools();

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', createServer);
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createServer();
        createWindow();
    }
});
