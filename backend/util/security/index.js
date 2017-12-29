
function SecUtil(randomP_ss) {
    //this shoud generate randomly in the future
    this.innerP_ss = "Sybase123" 
    this.algorithm = 'aes-256-ctr'
}

SecUtil.prototype.getHash = function(beforHash, startIndex, length) {
    return require('crypto').createHash('sha256').update(beforHash).digest('hex').substr(startIndex,length)
}

SecUtil.prototype.encryptPassword = function(beforeP_ss) {
    var cipher = require('crypto').createCipher(this.algorithm,this.innerP_ss)
    var crypted = cipher.update(beforeP_ss,'utf8','hex')
    crypted += cipher.final('hex');
    return crypted;
}

SecUtil.prototype.decryptPassword = function(afterP_ss) {
    var decipher = require('crypto').createDecipher(this.algorithm,this.innerP_ss)
    var dec = decipher.update(afterP_ss,'hex','utf8')
    dec += decipher.final('utf8');
    return dec;
}

module.exports = SecUtil