import React from 'react';
import electron from 'electron';
import { ConnectionManager } from '../../editor'
import './style.less'

class MainWindow extends React.Component {
    constructor(props, context) {
        super(props, context)
    }
    componentDidMount() {
        console.log('this is from main window info')
        electron.ipcRenderer.on('connection-info', (event, arg) => {
            console.log(arg)
        })
    }
    render() {
        return(
            <div>
                <div className="main-window">
                    <h2>Main Window</h2>
                    <ConnectionManager />
                </div>

            </div>
        )
    }
}

export default MainWindow