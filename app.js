var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var config = require('./models/baseconfig');
var LabelsHelper = require('./models/labels');

var index = require('./routes/index');

var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.locals.myname = config.myName;
app.locals.url = config.Url;
app.locals.title = config.myName+'的博客';
app.locals.keywords = config.KeyWords.join(',');

console.log('labels'+app.locals.labels);

if(!app.locals.labels){
  LabelsHelper.getAll(function(data){
    app.locals.labels = data;
  });
}
setInterval(function(){
  LabelsHelper.getAll(function(data){
    app.locals.labels = data;
  });
},1000*60*10);
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);

app.get('/zain/login',function(req, res){
  res.render('zain_login');
});
app.post('/zain/login',function(req, res){
  var account = req.body.account;
  var passwd = req.body.passwd;
  console.log(account);
  console.log(passwd);
  res.render('zain_login');
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
