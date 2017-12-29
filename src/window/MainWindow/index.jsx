import React from 'react';
import electron from 'electron';
import Rnd from 'react-rnd'
import { ConnectionManager } from '../../editor'
import './style.less'

class MainWindow extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            width: 500,
            height: 500,
            x: 0,
            y: 0
        }
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
                    <Rnd
                        size={{ width: this.state.width,  height: this.state.height }}
                        position={{ x: this.state.x, y: this.state.y }}
                        onDragStop={(e, d) => { this.setState({ x: d.x, y: d.y }) }}
                        onResize={(e, direction, ref, delta, position) => {
                            this.setState({
                            width: ref.offsetWidth,
                            height: ref.offsetHeight,
                            });
                        }}
                        >
                        <ConnectionManager />
                    </Rnd>
                </div>

            </div>
        )
    }
}

export default MainWindow