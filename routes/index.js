var express = require('express');
var router = express.Router();
var Log = require('../models/log');
var article = require('../models/article');
var SearchFilter = require('../models/searchfilter');

/* GET home page. */
router.get('/', function(req, res, next) {
  var search = SearchFilter(req.query.s+'');
  var label = req.query.l;
  if(!label || isNaN(label)) label = null;
  var pageIndex = req.query.i;
  if(!pageIndex || isNaN(pageIndex)) pageIndex = null;
  try {
    article.getList(function(data){
      res.render('index', { list:data });
    },search,label,pageIndex);
    console.log(data);
  } catch (error) {
    Log('select Aritcle by pageIndex: '+pageIndex+', search: '+search+', label: '+label+', '+error);
  }
  

  
});

module.exports = router;
