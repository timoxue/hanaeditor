const SIDB = require('../database');
const Security = require('./security')
const ERROR_DUPLICATED_CONNECTION = require('../error')

function Util() {
    this.db = new SIDB()
}

Util.prototype.saveConnection = function(connection) {
    const beforHash = connection.hostname + connection.database + connection.username + connection.instanceNum
    const key = new Security().getHash(beforHash, 0 , 8)
    console.log(key)
    const connFromDB = this.db.findConnection({id: key})
    if(connFromDB.length == 0) {
        this.db.writeConnection({
            'id':  key,
            'hostname': connection.hostname,
            'username': connection.username,
            'database': connection.database,
            'instanceNum': connection.instanceNum,
            'password' :  new Security().encryptPassword(connection.password)
        })
    } else {
        console.log(ERROR_DUPLICATED_CONNECTION)
    }
    return key
}

Util.prototype.updateConnection = function() {
    let connections = this.db.getAllConnection()
    let connArray = []
    connections.forEach(connection => {
        let data = { 
            key: connection.id, 
            name: connection.hostname + ":" + connection.instanceNum + ":" + connection.database + " (" + connection.username + ")",
            toggled: false,
            children: []
        }
        connArray.push(data)
    })
    global.hdbconnections = {
        conns : connArray
    }
    return connArray
}

Util.prototype.composeSingleConnection = function(key) {
    const connections = this.db.findConnection({id: key})
    const connection = connections[0]
    let data = { 
        key: connection.id, 
        name: connection.hostname + ":" + connection.instanceNum + ":" + connection.database + " (" + connection.username + ")",
        toggled: false,
        children: []
    }
    return data
}

Util.prototype.removeConnection = function(key) {
    const connFromDB = this.db.findConnection({id: key})
    if(connFromDB.length != 0) {
        this.db.removeConnection(connFromDB[0])
    }
}

module.exports = Util