var express = require('express');
var router = require('./route/index');
var app = express();
var debug = require('debug');

var serverAddr = '127.0.0.1';
var serverPort = process.env.PORT || 3000;

// start server
app.listen(serverPort, function(req, res){
    console.log('start Server!!, 서버가 시작되었습니다.');
});

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use('/', router);

app.use(function(req, res, next) {
    res.status(404).send('이상한 곳 들어가지마요');
});