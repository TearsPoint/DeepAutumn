var mysql = require('mysql');
var config = require('./config');
var sqlexecutor = require('./sqlexecutor')
var fs = require('fs');
var path = require('path');
var runtime = require('./runtime');
var sql = process.argv[2];
var rdire = process.argv[1];  //e:\MyWorkspace\DeepAutumn\NodeJs\DeepAutumn\sql 


Exec();
//ExecSqls();

function Exec() {
    if (sql == null || sql == undefined)
        sql = "select * from bi_posts";
    else if (path.extname(sql) == '.sql') {
        var filePath = path.join(rdire, '../sql-script/' + sql);
        console.log(filePath);
        sql = fs.readFileSync(filePath, 'utf-8');

        if (sql.indexOf('--##') > -1) {
            var sqls = [];
            sqls = sql.split('--##');
            if (sqls.length > 1) {
                sqls.forEach(function (element) {
                    //console.log(element);
                    ExecSql(element);
                }, this);
                return;
            }
        }
        else
        ExecSqls(sql);
    }
    console.log(sql);
    ExecSql(sql);
}


function ExecSql(sql) {
    sqlexecutor.ExecSql(sql,
        function (err, rows) {
            if (err) console.log(err, 3);
            else {
                console.log('等待退出...');
                setTimeout(function () {
                    process.exit();
                }, 2000);
            }
        }
        );
}


function ExecSqls(sql) {
    if (sql == null || sql == undefined)
        sql = "select * from bi_posts";
 
    sqlexecutor.ExecSqls(sql, {o:'i', value1:'testValue1'},
        function (err, rows) {
            if (err) log(err, 3);
            else {
                console.log('等待退出...');
                setTimeout(function () {
                    process.exit();
                }, 2000);
            }
        }
        );
}