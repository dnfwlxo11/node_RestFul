var express = require('express');
var mysql = require('mysql');
var async = require('async');
var path = require('path');
var bodyParser = require('body-parser');
var dbConfig = require('./mysql_config');
var router = express.Router();

router.get('/get', function (req, res) {
    var cnt = true;
    var conn = mysql.createConnection(dbConfig);
    console.log('받은 정보 : ' + req.body.name, req.body.password);

    async.waterfall([
        function getSQL() {
            var sql = 'SELECT * FROM node_table where name=?';
            var query = conn.query(sql, [req.body.name], function (err, rows) {
                if (err) {
                    console.log('존재하지 않는 회원이거나 비밀번호가 틀렸습니다. \n다시 한번 확인해 주세요.');
                    cnt = false;
                }

                else {
                    if (rows != '' && rows[0].name == req.body.name && rows[0].pass == req.body.pass) console.log('로그인 후 메인페이지로 이동');
                    else {
                        console.log('존재하지 않는 회원이거나 비밀번호가 틀렸습니다. \n다시 한번 확인해 주세요.');
                        cnt = false;
                    }
                }

                conn.end();
            });
        },
    
        function sendResult() {
            var data = {
                'result': cnt
            };
        
            console.log(data, '/get');
            res.send(data);
        },
        function print() {
            console.log('동기식으로 실행완료')
        }]
    );

    
});

router.post('/post', function (req, res) {
    console.log('post 실행');
    res.render(path.join(__dirname, '../public/1.ejs'))
});

router.put('/put', function (req, res) {
    console.log('put 실행');
});

router.delete('/delete', function (req, res) {
    console.log('delete 실행');
});

router.use('/', function (req, res) {
    res.render(path.join(__dirname, '../public/main_loginAfter.ejs'))
});

module.exports = router;