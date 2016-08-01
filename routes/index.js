/**
 * Created by 衡 on 15-5-16.
 */
var express = require('express');
var runtime = require('../runtime');
var sqlexecutor = require('../sqlexecutor');

function push(router) {
    /* GET home page. */
    router.get('/index', function (req, res) {
        if (!req.session.isLogin) {
            res.writeHead(302, { 'Location': '/account/login' }); //add other headers here... });
            res.end();
            return;
        }

        //正在接收报名的活动
        

        res.render('index', { title: '主页', uid: req.session.uid, uname: req.session.uname });
    });

    router.get('/contact', function (req, res) {
        res.render('contact', {});
    }
    );
};

module.exports.push = push;