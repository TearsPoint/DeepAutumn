var mysql = require('mysql');
var config = require('./config');
var sqlexec = require('./sqlexec')
var fs = require('fs');
var path = require('path');
var runtime = require('./runtime');
var sql = process.argv[2];
var rdire = process.argv[1];  //e:\MyWorkspace\DeepAutumn\NodeJs\DeepAutumn\sql 


Exec();

function Exec() {
    if (sql == null || sql == undefined)
        sql = "select * from bi_posts";
    else if (path.extname(sql) == '.sql') {
        var filePath = path.join(rdire, '../sql-script/' + sql);
        console.log(filePath);
        sql = fs.readFileSync(filePath, 'utf-8');

        if (sql.indexOf('--##') > -1) {
            var sqls = [];
            sql = sql.replace(/--.*/g, '--##');
            sqls = sql.split('--##');
            if (sqls.length > 1) {
                var conn = sqlexec.currentConnection();
                //console.log(conn);
                conn.beginTransaction(function doT(err) {
                    if (err) {
                        console.log('err');
                        conn.rollback(function () {
                        });
                        waitExit(2000);
                    }
                    else {
                        // (function a(p) {
                        //     console.log(p);
                        // } (2));
                        (function doTransaction(i, len, count, callback) {
                            if (i < len) {
                                // ExecSql(sqls[i]);
                                // doTransaction(i + 1, len, i + 1, callback);
                                try {
                                    sqlexec.ExecSql(sqls[i], function oncomplete(err, data) {
                                        try {
                                            doTransaction(i + 1, len, i + 1, callback);
                                        } catch (err) {
                                            conn.rollback();
                                            return;
                                        }
                                    });
                                } catch (err) { throw err; }
                            }
                            else { callback(); }
                        } (0, sqls.length, 0, function callback() {
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
        else {
            sql = sql.replace(/--.*/g, '');
            ExecSqls(sql);
        }
    }
    else {
        console.log(sql);
        ExecSql(sql);
    }
}


function waitExit(time) {
    console.log('等待退出...');
    setTimeout(function () {
        process.exit();
    }, time);
}


function ExecSql(sql) {
    sqlexec.ExecSql(sql,
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

    sqlexec.ExecSqls(sql, { o: 'i', value1: 'testValue1' },
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