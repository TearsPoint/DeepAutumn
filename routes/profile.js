/**
 * Created by 衡 on 15-5-16.
 */
var express = require('express');
var runtime = require('../runtime');
var sqlexecutor = require('../sqlexecutor');

function push(router) {
    /* GET home page. */
    router.get('/profile', function (req, res) {
        if (!req.session.isLogin) {
            res.writeHead(302, { 'Location': '/account/login' }); //add other headers here... });
            res.end();
            return;
        }
        res.render('profile', { title: '个人设置', uid: req.session.uid, uname: req.session.uname });
    });



    router.get('/contact', function (req, res) {
        res.render('contact', {});
    }
    );
};

module.exports.push = push;