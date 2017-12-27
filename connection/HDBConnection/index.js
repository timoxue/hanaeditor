const hdb = require('hdb')

function HDBConnection (hostname, port, database, user, password) {
    this.hostname = hostname
    this.port = port
    this.database = database
    this.user = user
    this.password
}

HDBConnection.prototype.initialize = function() {
    console.log("initialized!")
}

HDBConnection.prototype.getConnection = function() {
    return hdb.createClient({
        host: this.hostname, // system database host
        port: this.port,       // instance number of the HANA system
        databaseName: this.database,   // name of a particular tenant database
        user: this.user,   // user for the tenant database
        password: this.password    // password for the user specified
    })
}


module.exports = HDBConnection