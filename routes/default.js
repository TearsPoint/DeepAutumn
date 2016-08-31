/**
 * Created by 衡 on 15-5-16.
 */
var express = require('express');
var runtime = require('../runtime');
var sqlexec = require('../sqlexec');

function push(router) {
    /* GET home page. */
    router.get('/', function (req, res) {
        res.render('index', { title: 'Welcome 13hike' });
    });

}

module.exports.push = push;