var mysql = require('mysql');
var config = require('./config');
var sqlexecutor = require('./sqlexecutor')
var sql = process.argv[2];

DoInstall();
function DoInstall() {
    if(sql !==null && sql !==undefined)
    {
    }
    else
    {
        sql = "select * from bi_posts";
    }
    
    //sqlexecutor.ExecSql('USE r7gs53056x0gq8dq;');
    sqlexecutor.ExecSql(sql,
        function (err, rows) {
            if (err) log(err, 3);
            else {  //
                console.log(rows);
                console.log('等待退出...');
                setTimeout(function () {
                    process.exit();
                }, 3000);
            }
        }
        );


}