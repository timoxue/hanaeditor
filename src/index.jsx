
console.log('running in electron: ', require('is-electron-renderer'));

import React from 'react'
import ReactDOM from 'react-dom'
import electron from 'electron'
import MainWindow from './editor'
import * as WindowType from './constants/window' 
import ConnectionWindow from './window/ConnectionWindow'

var homePage = <MainWindow />

const title = electron.remote.getCurrentWindow().getTitle()

if(title === WindowType.CONN_WINDOW_TITLE) {
    homePage = <ConnectionWindow />
} else if (title == WindowType.EDITOR_WINDOW_TITLE) {
    homePage = <h1>This is from main renderer window</h1>
}

ReactDOM.render(
    homePage,
    document.getElementById('root')
);

