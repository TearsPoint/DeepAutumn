/**
 * Created by 衡 on 15-5-17.
 */
var express = require('express');
var runtime = require('../runtime');
var sqlexecutor = require('../sqlexecutor');

function SetRouter(router) {
    /* GET chat page. */
    router.get('/jxdemo', function (req, res) {
        res.render('jxdemo', { title: 'Express' });
    });

    router.post('/jxdemo', function (req, res) {
        res.render('jxdemo', { title: 'Express' });
    });
}

module.exports.SetRouter = SetRouter;