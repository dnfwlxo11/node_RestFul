var express = require('express');
var path = require('path');
var router = express.Router();
var page = require('./pageFunc')
var db = require('./RESTful');

router.use('/page', page, function() {
    console.log('page 접근');
});

router.use('/api', db, function() {
    console.log('api 접근');
});

// main
router.get('/', function(req, res) {
    if (req.session.username && req.session.password) res.render(path.join(__dirname, '../public/main_loginAfter.ejs'));
    else  res.render(path.join(__dirname, '../public/main.ejs'));
});

module.exports = router;