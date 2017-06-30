//文章实体
var ArticleModel = {
    id:0,
    title:'',
    subtitle:'',
    titlepicture:'',
    content:'',
    createtime:null,
    keywords:'',
    labelid:0,
}
//文章状态
var ArticleState = {
    Deleted:0,//已删除
    Normal:1,//正常
}

module.exports = {ArticleModel,ArticleState};