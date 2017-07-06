var fs = require('fs');

module.exports = function(log){
    var d = new Date(),file = d.getFullYear()+'-'+d.getMonth()+'-'+d.getDate()+'.log';
    log = d.toISOString()+'：'+log + '\r\n';
    fs.appendFileSync(file,log)
}