import React from 'react'
import './style.less'
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
            <li key={1}>{conn.hostname}</li>
        )
        return (     
            <div className="left-manager">
                tree here:
                <div className="tree">
                     {listItems}
                </div>
            </div>
        )
    }   
}


export default ConnectionManager