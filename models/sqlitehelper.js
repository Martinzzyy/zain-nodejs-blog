var config = require('./baseconfig');
var sqlite = require('sqlite3');

var SqliteHelper = function(sqlStr,dbPath = config.sqlitePath){
    var db = new sqlite.Database(dbPath);
    this.Close = function(){
        db.close();
    },
    this.Select = function(callback){
        var arr = new Array();
        db.each(sqlStr,function(err,row){
            if(!err) arr.push(row);
        },function(err,count){
            if(!err) callback && callback(arr);
        });
        this.Close();
    },
    this.ExecuteNonQuery = function(callback){
        db.run(sqlStr,function(result){
            callback && callback(result);
        });
        this.Close();
    }
}

module.exports = SqliteHelper;