/**
 * Created by 衡 on 15-5-17.
 */
var express = require('express');
var runtime = require('../runtime');
var sqlexecutor = require('../sqlexecutor');
var url = require('url');

function push(router) {
    router.get('/account/login', function (req, res) {
        res.render('login', { title: '登录' });
    });

    router.post('/account/loginsvc', function (req, res) {
        runtime.Log("login_key:" + req.param('login_key'), 1);
        var login_key = req.param('login_key');
        var login_pwd = req.param('login_pwd');
        var cpwd = runtime.md5(runtime.md5(login_pwd));
        runtime.Log("login_pwd:" + cpwd, 1);

        sqlexecutor.ExecSql('SELECT *,1 as count FROM user where ( user_name = @login_key or email= @login_key1 or phone= @login_key2 ) and pwd= @cpwd', { login_key: login_key, login_key1: login_key, login_key2: login_key, cpwd: cpwd },
            function (err, rows) {
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

    //进入用户信息页面
    router.get('/account/register', function (req, res) {
        //var param = url.parse(req.url, true).query;
        var data = { user_name: '', pwd: '', real_name: '', gender: '', idcard: '', phone: '', email: '', wechat_no: '', about_me: '' };

        if (req.session.uid != undefined && req.session.uid > 0) {
            sqlexecutor.ExecSql('select * from user where id=@uid', { uid: req.session.uid },
                function (err, rows) {
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

    //保存用户信息
    router.post('/account/regsvc', function (req, res) {
        var uname = req.param('uname');
        if (req.param('upwd' != undefined))
            var upwd = runtime.md5(runtime.md5(req.param('upwd')));
        var ureal_name = req.param('ureal_name');
        var ugender = req.param('ugender');
        var uidcard = req.param('uidcard');
        var uphone = req.param('uphone');
        var uemail = req.param('uemail');
        var uwechat_no = req.param('uwechat_no');
        var uabout_me = req.param('uabout_me');

        if (req.session.uid != undefined && req.session.uid > 0) {
            sqlexecutor.ExecSql(' update user set  user_name=@uname,real_name=@ureal_name,gender=@ugender,idcard=@uidcard,phone=@uphone,email=@uemail,wechat_no=@uwechat_no,about_me=@uabout_me  where id = @id ',
                { id: req.session.uid, uname: uname, upwd: upwd, ureal_name: ureal_name, ugender: ugender, uidcard: uidcard, uphone: uphone, uemail: uemail, uwechat_no: uwechat_no, uabout_me: uabout_me }, function (err, rows) {
                    if (err) log(err);
                    else if (rows.affectedRows > 0) {
                        req.session.uname = uname;
                        res.render('register', {
                            title: '修改个人信息',
                            user: { user_name: uname, pwd: upwd, real_name: ureal_name, gender: ugender, idcard: uidcard, phone: uphone, email: uemail, wechat_no: uwechat_no, about_me: uabout_me }
                        });
                    }
                    else {
                        res.send('操作失败');
                        return;
                    }
                });
        }
        else
            sqlexecutor.ExecSql('insert into user(user_name,real_name,gender,idcard,phone,email,wechat_no,about_me) ' +
                'values (@uname ,@ureal_name,@ugender,@uidcard,@uphone,@uemail,@uwechat_no,@uabout_me)',
                { uname: uname, upwd: upwd, ureal_name: ureal_name, ugender: ugender, uidcard: uidcard, uphone: uphone, uemail: uemail, uwechat_no: uwechat_no, uabout_me: uabout_me },
                function (err, rows) {
                    res.contentType('application/json');
                    if (err) { res.send('-1'); log(err, 3); }
                    else {
                        data = rows;

                        req.session.isLogin = true;
                        req.session.uid = rows.insertId;
                        req.session.uname = uname;
                        
                        res.writeHead(302, { 'Location': '/account/setpwd' }); //add other headers here... });
                        res.end();
                        return;
                    }
                });

        //res.send({ info: "正在注册。。。" });
    });

    router.get('/account/setpwd', function (req, res) {
        if (!req.session.isLogin) {
            res.writeHead(302, { 'Location': '/account/login' }); //add other headers here... });
            res.end();
            return;
        }
        res.render('setpwd', { title: '设置密码', uid: req.session.uid, uname: req.session.uname });
    });

    router.post('/account/setpwd', function (req, res) {
        if (!req.session.isLogin) {
            res.writeHead(302, { 'Location': '/account/login' }); //add other headers here... });
            res.end();
            return;
        }

        var login_pwd = req.param('login_pwd');
        var login_pwd2 = req.param('login_pwd2');

        if (login_pwd != login_pwd2) {
            res.send('两次密码输入不一致');
            return;
        }

        var cpwd = runtime.md5(runtime.md5(login_pwd));
        var cpwd2 = runtime.md5(runtime.md5(login_pwd2));

        sqlexecutor.ExecSql(' update user set pwd = @pwd  where id = @id ', { pwd: cpwd, id: req.session.uid }, function (err, rows) {
            if (err) log(err);
            else if (rows.affectedRows > 0) {
                res.writeHead(302, { 'Location': '/account/login' });
                res.end();
                return;
            }
            else {
                res.send('操作失败');
                return;
            }
        });
    });

    router.get('/account/signout', function (req, res) {
        req.session.destroy();
        res.writeHead(302, { 'Location': '/account/login' });
        res.end();
        return;
    });
}

module.exports.push = push;