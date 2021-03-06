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
//backend
const HDBConnection = require('./backend/connection/HDBConnection')
const SIDB = require('./backend/database')
const Util = require('./backend/util')

/**
 * Intiailization service area
 * e.g. HANA Connection
 */
const conn = new HDBConnection()
const jsondb = new SIDB()
const utility = new Util()
const ipc = electron.ipcMain;

/**
 * initialize database
 */
jsondb.initialize()

/**
 * Global area
 */
//initialize the global values

global.hdbconnections = {
    conns : utility.updateConnection()
}

 /**
  * App intiailization
  */
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
        autoHideMenuBar: true,
        frame: false
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
        console.log("Get connection info!" + arg)
        let port = arg.instanceNum * 100 + 3 * 10000 + 15
        let client = conn.initialize(arg.hostname, port, arg.database, arg.username, arg.password).getClient()
        if(arg.hostname === '') {
            //nothing need to improve in the future
        } else {
            client.connect((err) => {
                if (err) {
                    console.error('Connect error', err);
                }
                client.exec('select * from DUMMY', (err, rows) => {
                    client.end();
                    console.log("successful executed!")
                    let savedConnKey = utility.saveConnection(arg)
                    utility.updateConnection()
                    mainWindow.webContents.send('connection-info', utility.composeSingleConnection(savedConnKey))
                    console.log(rows)
                })
            })
            //mainWindow.webContents.send('connection-info', arg)
            connectionWindow.webContents.send('connection-info', arg)
        }
        //jsondb.writeConnection(arg)

    })

    ipc.on('retrive-sql-data', (arg) => {
        
    })


//inside    
})