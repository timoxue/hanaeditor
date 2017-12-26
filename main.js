/* eslint strict: 0 */
'use strict';

const electron = require('electron');
const url = require('url');
const path = require('path');
const WindowType = require('./src/constants/window.jsx');
const global_config = require('./env.js');

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
let mainWindow, connectionWindow = null;

const ipc = electron.ipcMain;
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
      app.quit();
  }
});

app.on('ready', () => {
    mainWindow = new BrowserWindow({ 
        title: WindowType.EDITOR_WINDOW_TITLE, 
        width: 1024, 
        height: 768 
    });
    connectionWindow = new BrowserWindow({
        title: WindowType.CONN_WINDOW_TITLE, 
        width: WindowType.CONN_WINDOW_WIDTH,
        width: WindowType.CONN_WINDOW_WIDTH,
        height: WindowType.CONN_WINDOW_HEIGHT,
        parent: mainWindow, 
        modal: true,
        frame: true,
        autoHideMenuBar: true
    })

    /** 
     * dev tools 
     */
    if(global_config.NODE_ENV == 'dev' || false) {
        mainWindow.webContents.openDevTools();
        connectionWindow.webContents.openDevTools();
    }

    /**
     * load pages
     */
    connectionWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'src','index.html'),
        protocol: 'file:',
        slashes: true
    }))
    
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'src','index.html'),
        protocol: 'file:',
        slashes: true
    }))

    /** 
     * windows behaviors
     */
    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    /**
     * ipc communication
     */

    ipc.on('closeConnectionWindow', function(event) {
        event.returnValue = '';
        connectionWindow.hide();
    })

    ipc.on('showConnectionWindow', function(event) {
        event.returnValue = '';
        connectionWindow.show();
    })

    ipc.on('addConnection', function(event, arg) {
        event.returnValue = '';
        mainWindow.webContents.send('connection-info', 'hana sql')
        console.log("send!")
    })
})