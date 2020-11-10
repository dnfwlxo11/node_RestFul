var express = require('express');
var router = express.Router();
var db = require('./mysql_config');
var path = require('path');

// page move function
function login(name) {
    if (0) console.log('로그인 실패');
    else console.log('로그인 로직 실행');
};

// main
router.get('/', function(req, res){
    res.render(path.join(__dirname, '../public/main.ejs'));
});

// login After
router.post('/main', function(req, res){
    res.render(path.join(__dirname, '../public/main_loginAfter.ejs'));
});

module.exports = router;