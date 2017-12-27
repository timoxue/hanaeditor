import React from 'react';
import electron from 'electron';

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
            <div className="item btn-add-conn">
                <h2>Main Window</h2>
            </div>
        )
    }
}

export default MainWindow