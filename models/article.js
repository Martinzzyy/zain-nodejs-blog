var config = require('./baseconfig');
var atricle_model = require('./article_model');
var SqlHelper = require('./sqlitehelper');
var Log = require('./log');

var AtricleHelper = {
    getList: function(callback,search,label,pageIndex, pageSize){
        pageIndex = pageIndex || 1;
        pageSize = pageSize || config.pageSize;
        var sql = new Array();
        sql.push('select * from Article where State='+atricle_model.ArticleState.Normal);
        if(!!search){
            sql.push(" and Title like '%"+search+"%' or Subtitle like '%"+search+"%' or KeyWords like '%"+search+"%'");
        }
        if(!!label){
            sql.push(" and LabelId="+label);
        }
        sql.push(" order by CreateTime desc limit "+pageSize+" offset "+pageSize*(pageIndex-1));
        var helper = new SqlHelper(sql.join(""));
        helper.Select(function(arr){
            var result = [];
            for(var i in arr){
                result.push({
                    id : arr[i].rowid,
                    title : arr[i].Title,
                    subtitle : arr[i].Subtitle,
                    titlepicture : arr[i].TitlePicture,
                    content : arr[i].Content,
                    createtime : arr[i].CreateTime,
                    keywords : arr[i].KeyWords,
                    labelid : arr[i].LabelId,
                });
            }
            callback && callback(result);
        });
    },
    backGetList(callback,pageIndex,search,label,pageSize){
        pageIndex = pageIndex || 1;
        pageSize = pageSize || config.pageSize;
        var sql = new Array(),countSql = new Array();
        sql.push('select rowid,Title,CreateTime,LabelId,(select count(rowid) from ArticleSee where ArticleId=a.rowid) as see from Article as a where State='+atricle_model.ArticleState.Normal);
        countSql.push('select count(rowid) as count from Article where State='+atricle_model.ArticleState.Normal);
        if(!!search){
            sql.push(" and Title like '%"+search+"%'  or Subtitle like '%"+search+"%' or KeyWords like '%"+search+"%'");
            countSql.push(" and Title like '%"+search+"%' or Subtitle like '%"+search+"%' or KeyWords like '%"+search+"%'")
        }
        if(!!label){
            sql.push(" and LabelId="+label);
            countSql.push(" and LabelId="+label);
        }
        sql.push(" order by see desc,CreateTime desc limit "+pageSize+" offset "+pageSize*(pageIndex-1));
        var countHelper = new SqlHelper(countSql.join(''));
        countHelper.Select(function(count){
            if(count.length > 0){
                var c = count[0].count;
                console.log(JSON.stringify(c));
                var helper = new SqlHelper(sql.join(""));
                helper.Select(function(arr){
                    var result = [];
                    for(var i in arr){
                        result.push({
                            id : arr[i].rowid,
                            title : arr[i].Title,
                            labelid : arr[i].LabelId,
                            sett: arr[i].see
                        });
                    }
                    callback && callback(result,c);
                });
            }else{
                callback && callback([],-1);
            }
        });
    },
    create:function(data,callback){
        var sql = "insert Article(Title,Subtitle,TitlePicture,Content,CreateTime,KeyWords,LabelId,State) values()"
    }
}

module.exports = AtricleHelper;