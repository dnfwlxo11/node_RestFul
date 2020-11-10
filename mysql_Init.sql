-- mysql 시작, mysql start
-- mysql -u root -p
-- 비밀번호 입력, input password

-- 데이터베이스 생성, create database
create database node_db

-- 유저 생성, create user
create user node_admin@localhost identified by '1234';

-- 유저 권한 부여, user privileges setting
grant all privileges on node_db.* node_admin@localhost;

-- mysql 종료, mysql exit
--exit

-- 생성한 데이터베이스, 유저로 시작, start by new database, user
-- mysql -u node_admin -p
-- 비밀번호 입력, input password

-- 생성한 데이터베이스 사용, use new database
-- use node_db;

-- 사용 시작, start use