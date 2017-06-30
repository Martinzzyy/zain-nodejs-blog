var config = require('./baseconfig');
var atricle_model = require('./article_model');
var SqlHelper = require('./sqlitehelper');

var AtricleHelper = {
    getList: function(search,label,pageIndex, pageSize){
        pageIndex = pageIndex || 1;
        pageSize = pageSize || config.pageSize;
        var sql = new Array();
        sql.push('select * from Article where State='+atricle_model.ArticleState.Normal);
        if(!!search){
            sql.push(" and Title like '%"+search+"%' or Subtitle like '%"+search+"%' ");
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
            return result;
        });
    }
}

module.exports = AtricleHelper;