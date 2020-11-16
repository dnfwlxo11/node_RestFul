var express = require('express');
var router = require('./route/index');
var bodyParser = require('body-parser');
var session = require('express-session');
var app = express();

var serverAddr = '127.0.0.1';
var serverPort = process.env.PORT || 3000;

// start server
app.listen(serverPort, function(req, res){
    console.log('start Server!!, 서버가 시작되었습니다.');
});

app.set('view engine', 'ejs');

app.use(bodyParser.raw());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

app.use(session({
    secret: '!@#$!@#@!#%$#!@#$', // 쿠키 변조를 방지하기 위한 값
    resave: false, // 세션을 언제 저장할지 지정하는 것, false를 권장
    saveUninitialized: true // 세션이 저장되기 전 초기화되지 않은 상태로 만들어 저장
}));

app.use('/', router);

app.use(function(req, res, next) {
    res.status(404).send('이상한 곳 들어가지마요.');
});