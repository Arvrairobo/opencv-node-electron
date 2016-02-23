const Menu = require('menu');
const emotions = require('./emotions');

module.exports = function (browserWindow, app, server) {
    var menu = Menu.buildFromTemplate([
        {
            label: 'Menu',
            submenu: [
                {
                    label: 'Detect emotion',
                    selector: 'getEmotion:',
                    accelerator: 'CmdOrCtrl+E',
                    click: function () {
                        server.getEmotions();
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
    mainWindow = new browserWindow({width: 800, height: 600});

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
    return mainWindow;
};
