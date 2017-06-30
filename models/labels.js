var config = require('./baseconfig');
var Models = require('./labelsmodel');
var SqlHelper = require('./sqlitehelper');

var LabelsHelper = {
    getAll:function(callback){
        var sql = "select rowid,Name,CreateTime,(select count(rowid) from LabelHot where LabelId=l.rowid) as Hot from Labels as l order by Hot desc";
        var sqlhelper = new SqlHelper(sql);
        sqlhelper.Select(function(arr){
            var result = [];
            for(var i in arr){
                result.push({
                    id : arr[i].rowid,
                    name : arr[i].Name,
                    createtime : arr[i].CreateTime,
                    hot : arr[i].Hot,
                });
            }
            callback && callback(result);
        })
    }
}

module.exports = LabelsHelper;