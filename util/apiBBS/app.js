var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors')

//路由路径
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var geoRouter = require('./routes/geo')
var mapRouter = require('./routes/map')
var bbsRouter = require('./routes/bbs')
var upLoadRouter = require('./routes/upload')
var blockRouter = require('./routes/block')
var msgRouter = require('./routes/msg')
var app = express();

//引入body-parser中间件以来解析请求体中的数据
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
//改写入口文件至app.js
var http = require('http');
var server = http.createServer(app);

app.use(cors())
//解决跨域
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "content-type,Authorization");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', ['mytoken','Content-Type']);
    next();
  });

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//解决跨域问题
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    next()
})

//路由路径设置
app.use('/', indexRouter);
app.use('/msg',msgRouter)
app.use('/users', usersRouter);
app.use('/geo',geoRouter)
app.use('/map',mapRouter)
app.use('/bbs',bbsRouter)
app.use('/upload',upLoadRouter)
app.use('/block',blockRouter)
app.listen('3000')

