/**
 * Created by 衡 on 15-5-17.
 */
var express = require('express');
var runtime = require('../runtime');
var sqlexecutor = require('../sqlexecutor');
var url = require('url');

function push(router) {
    router.get('/account/login', function(req, res) {
        res.render('login', { title: '登录' });
    });

    router.post('/account/loginsvc', function(req, res) {
        runtime.Log("login_key:" + req.param('login_key'), 1);
        var login_key = req.param('login_key');
        var login_pwd = req.param('login_pwd');
        var cpwd = runtime.md5(runtime.md5(login_pwd));
        runtime.Log("login_pwd:" + cpwd, 1);

        sqlexecutor.ExecSql('SELECT *,1 as count FROM user where ( user_name = @login_key or email= @login_key1 or phone= @login_key2 ) and pwd= @cpwd', { login_key: login_key, login_key1: login_key, login_key2: login_key, cpwd: cpwd },
            function(err, rows) {
                if (err) { log(err, 3); }
                if (rows[0] === undefined || rows[0].count == 0) {
                    //res.contentType('application/json');
                    res.send('{"error":“登录失败”}');
                    return;
                }
                else if (rows[0].count > 0) {
                    req.session.isLogin = true;
                    req.session.uname = rows[0].user_name;
                    req.session.uid = rows[0].id;


                    //res.contentType('application/text'); 
                    //res.render('chat');  //只是呈现，客户端的url没有变化
                    res.writeHead(302, { 'Location': '/index' }); //add other headers here...  
                    res.end();
                    return;
                }
            });
    });

    router.get('/account/register', function(req, res) {
        //var param = url.parse(req.url, true).query;
        var data = { user_name: '', pwd: '', real_name: '', gender: '', idcard: '', phone: '', email: '', wechat_no: '', about_me: '' };

        if (req.session.uid != undefined && req.session.uid > 0) {
            sqlexecutor.ExecSql('select * from user where id=@uid', { uid: req.session.uid },
                function(err, rows) {
                    if (err) log(err, 3);
                    if (rows.length > 0) {
                        res.render('register', { title: '修改个人信息', user: rows[0] });
                        return;
                    }
                    else
                        res.render('register', { title: '加入', user: data });
                }
            );
        }
        else
            res.render('register', { title: '加入', user: data });
    });

    router.post('/account/regsvc', function(req, res) {
        var uname = req.param('uname');
        var upwd = runtime.md5(runtime.md5(req.param('upwd')));
        var ureal_name = req.param('ureal_name');
        var ugender = req.param('ugender');
        var uidcard = req.param('uidcard');
        var uphone = req.param('uphone');
        var uemail = req.param('uemail');
        var uwechat_no = req.param('uwechat_no');
        var uabout_me = req.param('uabout_me');

        sqlexecutor.ExecSql('insert into user(user_name,pwd,real_name,gender,idcard,phone,email,wechat_no,about_me) ' +
            'values (@uname ,@upwd ,@ureal_name,@ugender,@uidcard,@uphone,@uemail,@uwechat_no,@uabout_me)',
            { uname: uname, upwd: upwd, ureal_name: ureal_name, ugender: ugender, uidcard: uidcard, uphone: uphone, uemail: uemail, uwechat_no: uwechat_no, uabout_me: uabout_me },
            function(err, rows) {
                res.contentType('application/json');
                if (err) { res.send('-1'); log(err, 3); }
                else {
                    data = rows;
                    res.send({ data: data });
                }
            });

        //res.send({ info: "正在注册。。。" });
    });

}

module.exports.push = push;