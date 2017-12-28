import React from 'react';
import electron from 'electron';
import './style.less'

console.log("load connection window script!")

class ConnectionWindow extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.addConnection = this.addConnection.bind(this)
        this.updateInputValue = this.updateInputValue.bind(this)
        this.state = {
            hostname: '',
            database: '',
            username: '',
            password: '',
            instanceNum: ''
        }
    }

    addConnection() {
        console.log('1 send from renderer: add connection ' + process.type)
        electron.ipcRenderer.send('addConnection', this.state);
    }
    cancelWindow() {
        electron.ipcRenderer.send('closeConnectionWindow', 'HIDE')
    }
    updateInputValue(event) {
        const target = event.target
        const value = target.value
        const name = target.name
        this.setState({
            [name]: value
        })
        console.log("changed")
    }
    componentDidMount() {
        console.log('this is from connection window info')
        electron.ipcRenderer.on('connection-info', (event, arg) => {
            console.log(arg)
        })
    }
    render() {
        return (
            <h3>Connection properties</h3>,
            <div>
                <div className="cw-container">
                    <div className="item">
                        <label >Server Type : </label>
                        <select className="custom-select" id="servertype" defaultValue="HANA Data Server">
                            <option>HANA Data Server</option>
                        </select>
                    </div>
                    <div className="item">
                        <label>HostName : </label>
                        <input  type="text" className="in-text" name="hostname" value={this.state.hostname} onChange={this.updateInputValue} />
                    </div>
                    <div className="item">
                        <label>Instance Num : </label>
                        <input  type="text" className="in-text" name="instanceNum" value={this.state.instanceNum} onChange={this.updateInputValue} />
                    </div>
                    <div className="item">
                        <label>Database : </label>
                        <input  type="text" className="in-text" name="database" value={this.state.database} onChange={this.updateInputValue} />
                    </div>
                    <div className="item">
                        <label>UserName : </label>
                        <input type="text" className="in-text" name="username" value={this.state.username} onChange={this.updateInputValue} />
                    </div>
                    <div className="item">
                        <label>Password : </label>
                        <input type="password" className="in-text" name="password" value={this.state.password} onChange={this.updateInputValue} />
                    </div>
                    <div>
                        <button onClick={this.cancelWindow}>
                            Cancel
                        </button>
                    </div>
                    <div className="item btn-add-conn">
                        <button onClick={this.addConnection}>
                            Add Connection
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default ConnectionWindow