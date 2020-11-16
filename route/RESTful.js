var express = require('express');
var mysql = require('mysql');
var async = require('async');
var path = require('path');
var session = require('express-session');
var dbConfig = require('./mysql_config');
var router = express.Router();

router.get('/user/:name/:pass', function(req, res) {
    console.log('받은 정보 : ' + req.params.name, req.params.pass)
    var sess;
    sess = req.session;
    var cnt = true;
    var conn = mysql.createConnection(dbConfig);
    var sql = 'SELECT * FROM node_table where name=?';
    var query;
    var data = req.params;
    var sendData = {};

    query = conn.query(sql, [data.name], function(err, rows) {
        if (err) {
            console.log('존재하지 않는 회원이거나 비밀번호가 틀렸습니다. \n다시 한번 확인해 주세요.');
            sendData.data = false;
            conn.end();
        }

        else {
            if (rows.length != 0 && rows[0].name == data.name && rows[0].pass == data.pass) {
                console.log('로그인 후 메인페이지로 이동');
                sess.username = data.name;
                sess.password = data.pass;
                console.log('현재 session에 저장된 정보 :', sess.username, sess.password);
                sendData.data = true;
                conn.end();
            }

            else {
                console.log('존재하지 않는 회원이거나 비밀번호가 틀렸습니다. 2\n다시 한번 확인해 주세요.');
                sendData.data = false;
                conn.end();
            }
        }

        res.json(sendData);
    });
});

router.put('/put', function(req, res) {
    console.log('put 실행');
});

router.patch('/patch', function(req, res) {
    console.log('patch 실행');
});

router.post('/post', function(req, res) {
    console.log('post 실행');
    res.render(path.join(__dirname, '../public/1.ejs'))
});

router.delete('/delete', function(req, res) {
    console.log('delete 실행');
});

router.use('/', function (req, res) {
    res.render(path.join(__dirname, '../public/main_loginAfter.ejs'))
});

module.exports = router;