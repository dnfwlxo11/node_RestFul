var express = require('express');
var mysql = require('mysql');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
var dbConfig = require('./mysql_config');
var router = express.Router();

// body-parser setting, body-parser 설정
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true
}));

var conn = mysql.createConnection(dbConfig);

router.get('/get', function(req, res) {
    console.log(req.body);
});

router.post('/post', function(req, res) {
    console.log('post 실행');
    res.render(path.join(__dirname, '../public/1.ejs'))
});

router.put('/put', function(req, res) {
    console.log('put 실행');
});

router.delete('/delete', function(req, res) {
    console.log('delete 실행');
});

router.use('/', function(req, res) {
    res.render(path.join(__dirname, '../public/main_loginAfter.ejs'))
});

module.exports = router;