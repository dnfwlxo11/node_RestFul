var express = require('express');
var router = express.Router();
var page = require('./pageFunc')

router.use('/', page);

module.exports = router;