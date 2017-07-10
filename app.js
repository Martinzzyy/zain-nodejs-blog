var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var config = require('./models/baseconfig');
var LabelsHelper = require('./models/labels');
var AdminUser = require('./models/adminuser');
var Log = require('./models/log');
var index = require('./routes/index');

var zain_index = require('./routes/zain/index');
var zain_article = require('./routes/zain/article');

var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.locals.myname = config.myName;
app.locals.url = config.Url;
app.locals.title = config.myName+'的博客';
app.locals.keywords = config.KeyWords.join(',');
app.locals.urls = {
  searchUrl:config.Url
}

function getLabel(){
  try {
    LabelsHelper.getAll(function(data){
      app.locals.labels = data;
    });
  } catch (error) {
    Log('select label error: '+error);
  }
}

if(!app.locals.labels){
  getLabel();
}
setInterval(function(){
  getLabel();
},1000*60*10);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//session
app.use(session({
    secret: 'zainblog.com',//服务器端生成session的签名
    cookie: {path:'/zain',maxAge: 1800000},  //设置maxAge是1800000ms，即30分钟后session和相应的cookie失效过期
    rolling: true,
    resave:true,//当客户端并行发送多个请求时，其中一个请求在另一个请求结束时对session进行修改覆盖并保存。
    saveUninitialized: false//初始化session时是否保存到存储。默认为true
}))
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', index);

app.use(function(req,res,next){
  var url = req.originalUrl;
  if((url == '/zain/index' || url == '/zain/article' || url == '/zain/article/add') && !req.session.user){
    return res.redirect('/zain/login?callback='+url);
  }
  next();
})

app.use('/zain/index',zain_index);
app.use('/zain/article',zain_article)

app.get('/zain/login',function(req, res){
  res.render('zain_login');
});
app.post('/zain/login',function(req, res){
  var account = req.body.account,
    passwd = req.body.passwd,
    str = "[@/'\"#$%&^*;]+",
    reg = new RegExp(str),
    error = '-1';
  if(!account){
    error = '账号不能为空!'
  }else if(!passwd){
    error = '密码不能为空!'
  }else if(reg.test(account)){
    error = '账号包含非法字符!';
  }

  if('-1' != error){
    res.render('zain_login',{result:{
      error:error
    }});
  }
  AdminUser.login(account,passwd,function(data){
    if(data.length > 0){
      req.session.user = data;
      var url = req.query.callback;
      if(!!url){
        res.redirect(url);
      }else{
        res.redirect('/zain/index');
      }
    }else{
      res.render('zain_login',{result:{
        error:'账号密码错误!'
      }});
    }
  });
  
  
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  console.log('404');
  var err = new Error('Not Found');
  err.status = 404;
  res.render('notfound');
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  console.log('error url: '+req.originalUrl);
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
