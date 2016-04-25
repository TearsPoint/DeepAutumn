var mysql = require('mysql');
var config = require('./config');
var sqlexecutor = require('./sqlexecutor')
var fs = require('fs');
var path = require('path');
var runtime = require('./runtime');
var sql = process.argv[2];
var rdire = process.argv[1];  //e:\MyWorkspace\DeepAutumn\NodeJs\DeepAutumn\sql 


//Exec();
//ExecSqls();
//test();
customerFormatSqlFile();

function test() {
    var data;
    var uname = 'test';
    var pwd = '123';
    var cpwd = runtime.md5(runtime.md5(pwd));
    
    //原始拼字符串   不安全
    //sqlexecutor.ExecSql('insert into user(user_name,pwd) values("' + uname + '","' + cpwd + '");',
    
    //使用format()
    sqlexecutor.ExecSql('insert into user(user_name,pwd) values(@uname ,@cpwd)', { uname: uname, cpwd: cpwd },
        function (err, rows) {
            if (err) { console.log(err, 3); }
            else {
                data = rows;
            }
        });
}


//注释format
function customerFormatSqlFile() {
    var query = '';
    if (path.extname(sql) == '.sql') {
        var filePath = path.join(rdire, '../sql-script/' + sql);
        console.log(filePath);
        query = fs.readFileSync(filePath, 'utf-8');
        var r = query.replace(/--.*/g, function (txt, key) {
            if (txt.indexOf('--##') > -1) return txt;
            console.log('txt:', txt, 'key:', key);
            return '';
        }.bind(this));

        console.log(r);
    }
}


function getRootPath() {
    var strFullPath = "http://localhost:8025/svc/usersvc";
    var a = strFullPath.indexOf("://");
    var protocal = strFullPath.substring(0, a);
    var b = strFullPath.substr(a + 3);
    var c = b.indexOf("/");
    var host = b.substring(0, c + 1);
    rootPath = protocal + "://" + host
    return (rootPath);
}


function Exec() {
    if (sql == null || sql == undefined)
        sql = "select * from bi_posts";
    else if (path.extname(sql) == '.sql') {
        var filePath = path.join(rdire, '../sql-script/' + sql);
        console.log(filePath);
        sql = fs.readFileSync(filePath, 'utf-8');

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
    console.log(sql);
    ExecSql(sql);
}


function ExecSql(sql) {
    sqlexecutor.ExecSql(sql,
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


function ExecSqls() {
    if (sql == null || sql == undefined)
        sql = "select * from bi_posts";
    else if (path.extname(sql) == '.sql') {
        var filePath = path.join(rdire, '../sql-script/' + sql);
        console.log(filePath);
        sql = fs.readFileSync(filePath, 'utf-8');
    }

    sqlexecutor.ExecSqls(sql,
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