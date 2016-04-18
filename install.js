var mysql      = require('mysql');
var config     = require('./config');
var sqlexecutor = require('./sqlexecutor')
DoInstall();
function DoInstall()
{
    //sqlexecutor.ExecSql('DROP DATABASE IF EXISTS blogdb; ','mysql');
    //sqlexecutor.ExecSql('CREATE DATABASE IF NOT EXISTS blogdb; ');
    sqlexecutor.ExecSql('USE r7gs53056x0gq8dq;');
    sqlexecutor.ExecSql('SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";');
    sqlexecutor.ExecSql('CREATE TABLE IF NOT EXISTS bi_categorys (' +
        'id int(11) NOT NULL AUTO_INCREMENT,' +
        'name varchar(50) NOT NULL,' +
        'url_short varchar(50) NOT NULL,' +
        'PRIMARY KEY (id)) ' +
        ' ENGINE='+ config.db_engine +' DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;');

    sqlexecutor.ExecSql('CREATE TABLE IF NOT EXISTS bi_links (' +
        'id int(11) NOT NULL AUTO_INCREMENT, ' +
        'name varchar(50) NOT NULL, ' +
        'url varchar(200) NOT NULL, ' +
        'rel varchar(20) NOT NULL, ' +
        'PRIMARY KEY(id))' +
        ' ENGINE='+ config.db_engine +' DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;');

    sqlexecutor.ExecSql('CREATE TABLE IF NOT EXISTS bi_posts (' +
        'id bigint(20) unsigned NOT NULL AUTO_INCREMENT, ' +
        'time int(10) NOT NULL, ' +
        'title text NOT NULL, ' +
        'content longtext NOT NULL, ' +
        'shortname VARCHAR(50) NOT NULL , ' +
        'category int(11) NOT NULL,  ' +
        'PRIMARY KEY (id),  KEY category (category)) ' +
        ' ENGINE='+ config.db_engine +'  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2;');

    sqlexecutor.ExecSql('ALTER TABLE bi_posts ADD UNIQUE (shortname);');
    sqlexecutor.ExecSql('INSERT INTO bi_posts (id, time, title, content, shortname,category) ' +
        'VALUES(1, 1415303515, "我的第一篇博文", "This is a sample post generate by system. Delete or Edit it now !","sample-post", 0); ');

    sqlexecutor.ExecSql('select * from bi_posts;');
    sqlexecutor.ExecSql('update bi_posts set content="很开心更新成功了" where id=1;');
    sqlexecutor.ExecSql('select * from bi_posts;');
    //connection.end();
    console.log("Install Success!");
    //process.exit(0);
}

