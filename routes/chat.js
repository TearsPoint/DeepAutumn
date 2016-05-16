/**
 * Created by 衡 on 15-5-17.
 */
var express = require('express');
var runtime = require('../runtime');
var sqlexecutor = require('../sqlexecutor');

function push(router) {
    /* GET chat page. */
    router.get('/chat', function (req, res) {
        res.render('chat', { title: 'Express' });
    });

    router.post('/chat', function (req, res) {
        res.render('chat', { title: 'Express' });
    });
}

module.exports.push = push;