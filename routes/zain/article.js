var express = require('express');
var router = express.Router();
var Models = require('../../models/article_model');
var Article = require('../../models/article');
var Resuslt = require('../../models/ResultModel');
var Log = require('../../models/log');
var config = require('../../models/baseconfig');
var multiparty = require('multiparty');
var fs = require('fs');

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
});

router.post('/uploadpicture',function(req,res){
    //生成multiparty对象，并配置上传目标路径
    var d = new Date();
    var path = './public/uploadpicture/'+d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate()+'/';
    console.log(path);
    fs.exists(path,function(exists){
        if(!exists){
            fs.mkdir(path,function(err){
                if(err){
                    console.log(err);
                    res.send(Resuslt(-1,'创建文件夹出错了'));
                }else{
                    upload(req,path,function(result){
                        res.send(result);
                    })
                }
            });
        }else{
            upload(req,path,function(result){
                res.send(result);
            })
        }
    })
});
router.post('/uploadthinker',function(req,res){
    //生成multiparty对象，并配置上传目标路径
    var d = new Date();
    var path = './public/uploadthinker/'+d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate()+'/';
    console.log(path);
    fs.exists(path,function(exists){
        if(!exists){
            fs.mkdir(path,function(err){
                if(err){
                    console.log(err);
                    res.send('');
                }else{
                    uploadthinker(req,path,function(result){
                        res.send(result);
                    })
                }
            });
        }else{
            uploadthinker(req,path,function(result){
                res.send(result);
            })
        }
    });
});
function uploadthinker(req,path,callback){
    var form = new multiparty.Form({uploadDir: path});
    
    form.parse(req,function(err, fields, files){
        var filesTmp = JSON.stringify(files,null,2);
        console.log("filesTmp:"+filesTmp);
        if(err){
            console.log(err);
            callback('');
        }else{
            console.log(files);
            callback('http://localhost:6010/'+files.img[0].path.replace('\public',''));
        }
    })
}
function upload(req,path,callback){
    var form = new multiparty.Form({uploadDir: path});
    form.parse(req,function(err, fields, files){
        //var filesTmp = JSON.stringify(files,null,2);
        if(err){
            console.log(err);
            callback(Resuslt(-1,'出错了'));
        }else{
            console.log(files.title_picture);
            callback(Resuslt(1,files.title_picture[0].path.replace('\public','')));
        }
    })
}

module.exports = router;