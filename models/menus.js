var config = require('./baseconfig');
var Models = require('./menus_model');
var SqlHelper = require('./sqlitehelper');

var MenusHelper = {
    getAll : function(callback){
        var sql = "select rowid,Name,ParentId,Url,SerialNumber,CreateTime from Menus where State="+Models.MenusState.Normal;
        var sqlhelper = new SqlHelper(sql);
        sqlhelper.Select(function(data){
            callback && callback(data);
        });
    }
};

module.exports = MenusHelper;