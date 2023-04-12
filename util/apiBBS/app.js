var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//路由路径
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var geoRouter = require('./routes/geo')
var mapRouter = require('./routes/map')

var app = express();

//引入body-parser中间件以来解析请求体中的数据
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
//改写入口文件至app.js
var http = require('http');
var server = http.createServer(app);


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//路由路径设置
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/geo',geoRouter)
app.use('/map',mapRouter)

app.listen('3000')