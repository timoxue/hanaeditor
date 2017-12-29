import React from 'react'
import './style.less'
import ConnectionTree from './../ConnectionTree'
import electron from 'electron'

class ConnectionManager extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            connections : electron.remote.getGlobal('hdbconnections')
        }
    }

    render() {
        const hxeconns = this.state.connections.conns
        const listItems = hxeconns.map((conn) =>
            <li key={conn.id}>{conn.hostname}:{conn.instanceNum}::{conn.database}({conn.username})</li>
        )
        return (     
            <div className="left-manager">
                <div className="tree">
                    <ConnectionTree />
                </div>
            </div>
        )
    }   
}


export default ConnectionManager