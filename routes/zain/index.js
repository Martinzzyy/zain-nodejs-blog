var express = require('express');
var router = express.Router();
var Log = require('../../models/log');
var Menus = require('../../models/menus');

const request = require('request');

router.get('/',function(res,req){
    request.get('http://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=zh-CN',function(error,response,body){
        const img = JSON.parse(body).images[0];
        const str = 'http://cn.bing.com'+img.url;

        Menus.getAll(function(data){
            var root = [];
            for(var i in data){
                if(data[i].ParentId == -1){
                    root.push(data[i]);
                }
            }
            root.sort(function(a,b){
                return a.SerialNumber - b.SerialNumber;
            });
            for(var i in root){
                root[i].Children = [];
                for(var j in data){
                    console.log(JSON.stringify(data[j]));
                    if(root[i].rowid == data[j].ParentId){
                        root[i].Children.push(data[j]);
                    }
                }
                root[i].Children.sort(function(a,b){
                    return a.SerialNumber - b.SerialNumber;
                });
            }
            req.render('zain_index',{bgimg:str,menus:root})
        })
    })
})

module.exports = router;