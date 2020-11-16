var express = require('express');
var mysql = require('mysql');
var async = require('async');
var path = require('path');
var session = require('express-session');
var dbConfig = require('./mysql_config');
const { send } = require('process');
var router = express.Router();

router.get('/user/:name', function(req, res) {
    var sess;
    sess = req.session;
    var conn = mysql.createConnection(dbConfig);
    var sql = 'SELECT * FROM node_table WHERE name=?';
    var data = req.params;
    var sendData = {};

    var query = conn.query(sql, [data.name], function(err, rows) {
        if (err) {
            console.log('데이터베이스 에러 발생');
            sendData.data = false;
        }
        
        else {
            if (rows.length != 0) {
                console.log('이미 사용중인 아이디입니다.');
                sendData.data = false;
            }

            else {
                console.log('사용 가능한 아이디입니다.');
                sendData.data = true;
            }
        }

        conn.end();
        res.send(sendData);
    });
});

router.get('/user/:name/:pass', function(req, res) {
    var sess;
    sess = req.session;
    var conn = mysql.createConnection(dbConfig);
    var sql = 'SELECT * FROM node_table WHERE name=?';
    var data = req.params;
    var sendData = {};

    var query = conn.query(sql, [data.name], function(err, rows) {
        if (err) {
            console.log('존재하지 않는 회원이거나 비밀번호가 틀렸습니다. \n다시 한번 확인해 주세요.');
            sendData.data = false;
        }

        else {
            if (rows.length != 0 && rows[0].name == data.name && rows[0].pass == data.pass) {
                console.log('로그인 후 메인페이지로 이동');
                sess.username = data.name;
                sess.password = data.pass;
                console.log('현재 session에 저장된 정보 :', sess.username, sess.password);
                sendData.data = true;
            }

            else {
                console.log('존재하지 않는 회원이거나 비밀번호가 틀렸습니다. 2\n다시 한번 확인해 주세요.');
                sendData.data = false;
            }
        }

        conn.end();
        res.send(sendData);
    });
});

router.put('/put', function(req, res) {
    console.log('put 실행');
});

router.patch('/patch', function(req, res) {
    console.log('patch 실행');
});

router.post('/register/:name/:pass/:memo', function(req, res) {
    var conn = mysql.createConnection(dbConfig);

    var sql = 'INSERT INTO node_table(name, pass, memo) VALUES (?, ?, ?)';
    var data = req.params;
    var sendData = {};

    if (data.memo.length == 0) data.memo = 'none';

    var query = conn.query(sql, [data.name, data.pass, data.memo], function(err, rows) {
        if (err) {
            console.log('이미 가입한 회원입니다.');
            sendData.data = false;
        }

        else {
            console.log('정상적으로 회원가입이 완료되었습니다.');
            sendData.data = true;
        }

        conn.end();
        res.send(sendData);
    });
});

router.delete('/delete/:name/:pass', function(req, res) {
    console.log('delete 실행');
});

router.use('/', function (req, res) {
    res.render(path.join(__dirname, '../public/main_loginAfter.ejs'))
});

module.exports = router;