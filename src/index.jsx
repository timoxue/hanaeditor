
console.log('running in electron: ', require('is-electron-renderer'));

import React from 'react'
import ReactDOM from 'react-dom'
import electron from 'electron'
import * as WindowType from './constants/window' 
import { MainWindow, ConnectionWindow } from './window'

var homePage = <MainWindow />

const title = electron.remote.getCurrentWindow().getTitle()

if(title === WindowType.CONN_WINDOW_TITLE) {
    homePage = <ConnectionWindow />
} else if (title == WindowType.EDITOR_WINDOW_TITLE) {
    homePage = <MainWindow />
}

ReactDOM.render(
    homePage,
    document.getElementById('root')
);

