var fs = require('fs');

module.exports = function(log){
    var d = new Date(),file = 'log/'+d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate()+'.log';
    log = d.toISOString()+'：'+log + '\r\n';
    fs.appendFileSync(file,log)
}