'use strict';
const electron = require('electron');
const server = require('./server');

// Module to control application life.
const app = electron.app;
const window = require('./window');

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function () {
    window(electron.BrowserWindow, app, server)
});

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
        window(electron.BrowserWindow, app, server);
    }
});
