var express = require('express');
var router = express.Router();

var article = require('../models/article');
var SearchFilter = require('../models/searchfilter');

/* GET home page. */
router.get('/', function(req, res, next) {
  var search = SearchFilter(req.query.s+'');
  var label = req.query.l;
  if(!label || isNaN(label)) label = null;
  var pageIndex = req.query.i;
  if(!pageIndex || isNaN(pageIndex)) pageIndex = null;
  var data = [],labels = [];
  try {
    data = article.getList(search,label,pageIndex);
  } catch (error) {
    
  }
  

  res.render('index', { list:data });
});

module.exports = router;
