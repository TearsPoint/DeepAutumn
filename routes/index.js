/**
 * Created by 衡 on 15-5-16.
 */
var express = require('express');
var runtime = require('../runtime');
var sqlexecutor = require('../sqlexecutor');

function push(router) {
    /* GET home page. */
    router.get('/index', function (req, res) {
        

        res.render('index', { title: '主页', uid:'001', uname: 'admin' });
    });


    router.get('/contact', function (req, res) {
        res.render('contact', {});
    }
    );
};

module.exports.push = push;