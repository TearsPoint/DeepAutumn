/**
 * Created by 衡 on 15-5-16.
 */
var express = require('express');
var runtime = require('../runtime');
var sqlexecutor = require('../sqlexecutor');

function push(router) {
    /* GET home page. */
    router.get('/', function (req, res) {
        res.render('default', { title: 'Welcome iHiking.me' });
    });

}

module.exports.push = push;