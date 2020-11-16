var express = require('express');
var app = express();
var router = express.Router();
var mysql = require('mysql');
var dbConfig = require('./mysql_config');
var db = require('./RESTful');
var path = require('path');

// 메인 페이지 (main)
router.get('/main', function(req, res) {
    console.log('main 페이지 이동');
    res.render(path.join(__dirname, '../public/main_loginAfter.ejs'));
});

// 회원가입 페이지 (register)
router.get('/register', function(req, res) {
    console.log('register 페이지 이동');
    res.render(path.join(__dirname, '../public/register.ejs'));
});

module.exports = router;