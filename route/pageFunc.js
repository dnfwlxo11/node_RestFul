var express = require('express');
var app = express();
var router = express.Router();
var mysql = require('mysql');
var dbConfig = require('./mysql_config');
var db = require('./RESTful');
var path = require('path');

// page move function
function login(name) {
    var conn = mysql.createConnection(dbConfig);
    console.log('받은 정보 : ' + name);

    var sql = 'SELECT * FROM node_table';
    var query = conn.query(sql, [name], function(err, rows) {
        if (err) {
            console.log('존재하지 않는 회원이거나 비밀번호가 틀렸습니다. \n다시 한번 확인해 주세요.');
            return false;
        }

        else {
            console.log('로그인 후 메인페이지로 이동');
        }

        conn.end();
    });

    console.log(query);
    return query.name;
};

// main
router.post('/main', function(req, res) {
    console.log(req.body)
    if (login(req.body.id)) res.render(path.join(__dirname, '../public/main_loginAfter.ejs'));
    else res.redirect('/')
});

module.exports = router;