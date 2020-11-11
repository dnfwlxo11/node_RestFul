var express = require('express');
var app = express();
var router = express.Router();
var mysql = require('mysql');
var dbConfig = require('./mysql_config');
var db = require('./RESTful');
var path = require('path');

// main
router.post('/main', function (req, res) {
    console.log(req.body.data, 'asd');
    if (req.data) res.render(path.join(__dirname, '../public/main_loginAfter.ejs'));
    else res.redirect('/');
});

module.exports = router;