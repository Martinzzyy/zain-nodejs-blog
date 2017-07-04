var express = require('express');
var router = express.Router();
var Log = require('../models/log');
var article = require('../models/article');
var SearchFilter = require('../models/searchfilter');
var config = require('../models/baseconfig');

/* GET home page. */
router.get('/', function(req, res, next) {
  var search = SearchFilter(req.query.s+'');
  var label = req.query.l;
  var resultUrls = {
    searchUrl : config.Url
  };
  if(!label || isNaN(label)) label = null;
  else resultUrls.searchUrl+'?l='+label;

  var pageIndex = req.query.i;
  if(!pageIndex || isNaN(pageIndex)) {
    pageIndex = null;
    resultUrls.nextpage = '#';
    resultUrls.uppage = '#';
  }else{
    var url = config.Url;
    if(!isNaN(label)) url += '?l='+label;
    resultUrls.nextpage = url + '&i=' + pageIndex+1;
    resultUrls.uppage = url + '&i=' + Math.max(1,pageIndex-1);
  }
  try {
    article.getList(function(data){
      res.render('index', { list:data,urls:resultUrls });
    },search,label,pageIndex);
  } catch (error) {
    Log('select Aritcle by pageIndex: '+pageIndex+', search: '+search+', label: '+label+', '+error);
    res.render('index');
  }
});

module.exports = router;
