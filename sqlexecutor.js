/**
 * Created by 衡 on 15-1-17.
 */

var mysql = require('mysql');
var config = require('./config');
var currentConnection;

function ConnDB(dbname) {
    if (currentConnection === undefined) {
        currentConnection = mysql.createConnection({
            host: config.db_host,
            port: config.db_port,
            user: config.db_user,
            password: config.db_password,
            database: dbname === undefined ? config.db_database : dbname
        });

        currentConnection.connect(function (err) {
            if (err != null) {
                console.log("Mysql Connect error:" + err, 3);
                currentConnection.end();
                setTimeout(ConnDB(dbname), 2000);
            } else {
                console.log("Mysql Connected!");
                OnConnectSuccess();
            }
        });

        currentConnection.on('error', function (err) {
            console.log(err, 3);
            ConnDB();
        });
    }
}


function ExecSql(sql, dbname, callback) {
    if (typeof (dbname) == 'function') {
        callback = dbname;
        dbname = config.db_database;
    }
    ConnDB(dbname);
    currentConnection.query(sql, function (err, rows) {
        if (err) {
            console.log(err);
            throw err;
        }
        else {
            if (callback !== undefined)
                callback(err, rows);
            console.log("脚本执行成功: " + sql);
            if (rows != undefined) {
                if (rows.affectedRows !== undefined)
                    console.log('affectedRows:' + rows.affectedRows)
                else if (rows.length > 0) {
                    for (var i = 0, len = rows.length; i < len; i++) {
                        console.log(rows[i]);
                    }
                }
            }
        }
    });
}

function OnConnectSuccess() {
    
}


module.exports.currentConnection = function () {
    ConnDB();
    return currentConnection;
};
module.exports.ExecSql = ExecSql;
