var config = require('./baseconfig');
var Models = require('./adminusermodel');
var SqlHelper = require('./sqlitehelper');
var Log = require('./log');

const crypto = require('crypto');
const key = 'zainblogdotcom';

var AdminUser = {
    getMd5 : function(value){
        var hash = crypto.createHash('md5',key);
        return hash.update(value).digest('hex');
    },
    login:function(account,passwd,callback){
        passwd = this.getMd5(passwd);
        console.log(passwd);
        var sql = "select rowid,Account from AdminUser where Account='"+account+"' and Passwd='"+passwd+"' and State="+Models.AdminUserState.Normal;
        var sqlHelper = new SqlHelper(sql);
        sqlHelper.Select(function(data){
            callback && callback(data);
        });
    }
}

module.exports = AdminUser;