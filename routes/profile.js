/**
 * Created by 衡 on 15-5-16.
 */
var express = require('express');
var runtime = require('../runtime');
var sqlexec = require('../sqlexec');

function push(router) {
    /* GET home page. */
    router.get('/profile', function (req, res, next) {
        if (!req.session.isLogin) {
            res.writeHead(302, { 'Location': '/account/login' }); //add other headers here... });
            res.end();
            return;
        }

        var data = { user_name: '', pwd: '', real_name: '', gender: '', idcard: '', phone: '', email: '', wechat_no: '', about_me: '' };

        if (req.session.uid != undefined && req.session.uid > 0) {
            sqlexec.ExecSql('select * from user where id=@uid', { uid: req.session.uid },
                function (err, rows) {
                    if (err) log(err, 3);
                    else if (rows.length > 0) {
                        res.render('profile', { title: '个人主页', user: rows[0] });
                        return;
                    }
                    else {
                        var err = new Error('Not Found');
                        err.status = 404;
                        next(err);
                    }
                }
            );
        }
        else {
            res.writeHead(302, { 'Location': '/account/register' }); //add other headers here... });
            res.end();
            return;
        }
    });

};

module.exports.push = push;