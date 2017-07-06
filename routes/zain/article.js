var express = require('express');
var router = express.Router();
var Models = require('../../models/article_model');
var Article = require('../../models/article');
var Resuslt = require('../../models/ResultModel');
var Log = require('../../models/log');
var config = require('../../models/baseconfig');

router.get('/',function(req,res){
    res.render('zain_article');
});

router.get('/add',function(req,res){
    res.render('zain_addarticle');
})

router.post('/',function(req,res){
    var pageIndex = req.body.pageindex,
        search = req.body.search;
        label = req.body.label;
    if(!label) label = null;
    try {
        Article.backGetList(function(data,count){
            if(0 <= count){
                res.send(Resuslt(1,JSON.stringify({
                    TotalCount:count,
                    pageIndex:pageIndex,
                    pageSize:config.pageSize,
                    DataList:data
                })));
            }else{
                res.send(Resuslt(-1,'未能获取到数据'))
            }
        },pageIndex,search,label);
    } catch (error) {
        console.log('catch error');
        Log('select article error: pageindex '+pageIndex+', search: '+search+', message:'+error);
        res.send(Resuslt(-1,'出错了'));
    }
})

module.exports = router;