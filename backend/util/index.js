const SIDB = require('../database');
const Security = require('./security')
const ERROR_DUPLICATED_CONNECTION = require('../error')

function Util() {
    this.db = new SIDB()
}

Util.prototype.saveConnection = function(connection) {
    const beforHash = connection.hostname + connection.database + connection.username + connection.instanceNum
    const key = new Security().getHash(beforHash, 0 , 8)
    const connFromDB = this.db.findConnection({'id': key})
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
        return ERROR_DUPLICATED_CONNECTION
    }
}


module.exports = Util