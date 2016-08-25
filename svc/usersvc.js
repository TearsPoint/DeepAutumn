var express = require('express');
var runtime = require('../runtime');
var sqlexec = require('../sqlexec');


function push(router) {
    router.get('/usersvc', function (req, res) {
        res.contentType('application/json');
        var data;
        sqlexec.ExecSql('select * from user limit 1000;', undefined, function (err, rows) {
            if (err) log(err, 3);
            else {
                data = rows;
                if (rows.length > 0) {
                    var propertys = Object.getOwnPropertyNames(rows[0]);
                    console.log(propertys);
                }
                //res.render('test', { title: 'test', data:data });
                res.send({ title: 'test', data: data });
            }
        });
    });

    router.post('/usersvc/save', function (req, res) {
        res.contentType('application/json');
        var data;
        var uname = req.param('user_name');
        var pwd = req.param('pwd');
        var cpwd = runtime.md5(runtime.md5(pwd));
        //sqlexec.ExecSql('insert into user(user_name,pwd) values("' + uname + '","' + cpwd + '");',
        sqlexec.ExecSql('insert into user(user_name,pwd) values(@uname ,@cpwd)', { uname: uname, cpwd: cpwd },
            function (err, rows) {
                if (err) { res.send('-1'); log(err, 3); }
                else {
                    data = rows;
                    res.send({ data: data });
                }
            });
    });
}


module.exports.push = push;