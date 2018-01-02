const hdb = require('hdb')

function HDBConnection (hostname, port, database, user, password) {
    this.hostname = hostname
    this.port = port
    this.database = database
    this.user = user
    this.password = password
    this.client
}

HDBConnection.prototype.initialize = function(hostname, port, database, user, password) {
    console.log("initialized!")
    this.hostname = hostname
    this.port = port
    this.database = database
    this.user = user
    this.password = password
    this.client
    this.getClient()
    return this
}

HDBConnection.prototype.getClient = function() {
    this.client =  hdb.createClient({
        host: this.hostname, // system database host
        port: this.port,       // instance number of the HANA system
        databaseName: this.database,   // name of a particular tenant database
        user: this.user,   // user for the tenant database
        password: this.password    // password for the user specified
    })
    return this.client
}

HDBConnection.prototype.executeSQL = function(sql) {
    this.client.connect((err) => {
        if (err) {
            console.error('Connect error', err);
        }
        client.exec(sql, (err, rows) => {
            client.end();
            return rows
        })
    })
}

module.exports = HDBConnection