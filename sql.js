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
                var conn = sqlexecutor.currentConnection();
                //console.log(conn);
                conn.beginTransaction(function doT(err) {
                    console.log('beginTransaction');
                    if (err) {
                        console.log(err); connection.rollback(function () {
                            throw err;
                        });
                        waitExit(2000);
                    }
                    else {
                        console.log("doTransaction1");
                        // (function a(p) {
                        //     console.log(p);
                        // } (2));
                        (function doTransaction(i, len, count, callback) {
                            console.log("doTransaction2");
                            if (i < len) {
                                ExecSql(sqls[i]);
                                doTransaction(i + 1, len, i + 1, callback);
                            }
                            else { callback(); }
                        } (0, sqls.length, 0, function callback() {
                            console.log("commit");
                            conn.commit();
                        }));
                    }
                });
                waitExit(8000);

                // sqls.forEach(function (element) {
                //     //console.log(element);
                //     ExecSql(element);
                // }, this);
                return;
            }
        }
        else
            ExecSqls(sql);
    }
    console.log(sql);
    ExecSql(sql);
}

function waitExit(time) {
    console.log('等待退出...');
    setTimeout(function () {
        process.exit();
    }, time);
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

    sqlexecutor.ExecSqls(sql, { o: 'i', value1: 'testValue1' },
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