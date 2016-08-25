/**
 * Created by 衡 on 15-1-17.
 */

var mysql = require('mysql');
var config = require('./config');
var fs = require('fs');
var path = require('path');
var runtime = require('./runtime');
var rdire = process.argv[1];

var currentConnection;

function ConnDB(dbname, multipleStatements) {
    if (currentConnection === undefined) {
        console.log('multipleStatements', multipleStatements);
        currentConnection = mysql.createConnection({
            host: config.db_host,
            port: config.db_port,
            user: config.db_user,
            password: config.db_password,
            database: dbname === undefined ? config.db_database : dbname,
            multipleStatements: multipleStatements === undefined ? false : multipleStatements
        });

        currentConnection.config.queryFormat = function (query, values) {
            if (!values) return query;
            return query.replace(/\@(\w+)/g, function (txt, key) {
                if (values.hasOwnProperty(key)) {
                    return this.escape(values[key]);
                }
                return txt;
            }.bind(this));
        };

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


function ExecSql(sql, dbname, data, callback) {
    try {
        if (sql.trim().length == 0) return;
        if (typeof (dbname) == 'function') {
            callback = dbname;
            dbname = config.db_database;
        }
        if (typeof (data) == 'function') {
            callback = data;
            data = dbname;  //values
            dbname = undefined;
        }
        ConnDB(dbname);
        currentConnection.query(sql, data, function (err, rows) {
            if (err) {
                currentConnection = undefined;
                runtime.Log(err, 3);
            }
            else {
                if (callback !== undefined) {
                    try {
                        callback(err, rows);
                    } catch (err) {
                        currentConnection = undefined;
                        runtime.Log(err, 3);
                    }
                }
                console.log("脚本执行成功: " + sql);
                End();
                if (rows != undefined) {
                    if (rows.affectedRows !== undefined)
                        console.log('affectedRows:' + rows.affectedRows)
                    // else if (rows.length > 0) {
                    //     for (var i = 0, len = rows.length; i < len; i++) {
                    //         console.log(rows[i]);
                    //     }
                    // }
                }
            }
        });
    } catch (err) {
        runtime.Log(err, 3);
    }
}


function ExecSqls(sql, dbname, data, callback) {
    if (typeof (dbname) == 'function') {
        callback = dbname;
        dbname = config.db_database;
    }
    if (typeof (data) == 'function') {
        callback = data;
        data = dbname;  //values
        dbname = undefined;
    }
    ConnDB(dbname, true);

    if (path.extname(sql) == '.sql') {
        var filePath = path.join(rdire, '../sql-script/' + sql);
        sql = fs.readFileSync(filePath, 'utf-8');
    }
    sql = sql.replace(/--.*/g, function (txt, key) {
        if (txt.indexOf('--##') > -1) return txt;
        return '';
    }.bind(this));

    currentConnection.query(sql, data, function (err, rows) {
        if (err) {
            currentConnection = undefined;
            runtime.Log(err, 3);
        }
        else {
            if (callback !== undefined)
                callback(err, rows);
            console.log("脚本执行成功: " + sql);
            if (rows != undefined) {
                if (rows.affectedRows !== undefined)
                    console.log('affectedRows:' + rows.affectedRows)
                // else if (rows.length > 0) {
                //     for (var i = 0, len = rows.length; i < len; i++) {
                //         console.log(rows[i]);
                //     }
                // }
            }
        }
    });
}

function OnConnectSuccess() {
    
}

function End() {
    if (currentConnection != undefined) {

    }
};


module.exports.End = End;

module.exports.currentConnection = function () {
    console.log('conn');
    ConnDB();
    return currentConnection;
};
module.exports.ExecSql = ExecSql;
module.exports.ExecSqls = ExecSqls;
module.exports.mysql = mysql;
