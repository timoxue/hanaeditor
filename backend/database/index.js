const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('./backend/database/db.json')
const db = low(adapter)

function SIDB() {
    this.err
}

SIDB.prototype.initialize = function() {
    db.defaults({ conns: [], opened: [] })
    .write()
}

SIDB.prototype.writeConnection = function(data) {
    db.get('conns')
    .push(data)
    .write()
}

SIDB.prototype.getAllConnection = function() {
    return db.get('conns').filter().value()
}

SIDB.prototype.findConnection = function(id) {
    //id parameter should be a object => {'key': '12345'}
    return db.get('conns').filter(id).value()
}

SIDB.prototype.removeConnection = function(connection) {
    return db.get('posts').remove({ id: connection.id }).write()
}

module.exports = SIDB