var mysql      = require('mysql');
var config     = require('./config');
var sqlexecutor = require('./sqlexecutor')
DoInstall();
function DoInstall()
{
    sqlexecutor.ExecSql('USE r7gs53056x0gq8dq;');
    sqlexecutor.ExecSql('select * from bi_posts;');
}