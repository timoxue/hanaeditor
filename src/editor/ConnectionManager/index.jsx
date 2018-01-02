import React from 'react'
import './style.less'
import ConnectionTree from './../ConnectionTree'
import electron from 'electron'

class ConnectionManager extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            moreConnection: null,
            isAddMore: false,
            connections : electron.remote.getGlobal('hdbconnections')
        }
    }

    addMoreConnection(self, arg) {
        self.setState = {
            isAddMore : true,
            moreConnection: arg
        }
    }

    componentDidMount() {
        const self = this
        electron.ipcRenderer.on('connection-info', (event, arg) => {
            console.log("this is did amount : ")
            console.log(arg)
            self.setState = {
                isAddMore : true,
                moreConnection: arg
            }
            console.log(self.state)
        })
    }

    render() {
        let moreConnection = null
        const hxeconns = this.state.connections.conns
        const connectionsList = hxeconns.map((data) =>
            <div key={data.key}><ConnectionTree data={data} /></div>
        )

        return (     
            <div className="left-manager">
                <div className="tree">
                    {connectionsList}
                    {
                        this.state.isAddMore?
                        <div key={this.state.moreConnection.key}><ConnectionTree data={this.state.moreConnection} /></div>
                        :
                        <div></div>
                    }
                </div>
            </div>
        )
    }   
}


export default ConnectionManager