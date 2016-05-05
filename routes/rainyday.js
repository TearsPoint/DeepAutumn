/**
 * Created by 衡 on 15-5-16.
 */
var express = require('express');
var runtime = require('../runtime');
var sqlexecutor = require('../sqlexecutor');

function SetRouter(router) {
    /* GET rainyday page. */
    router.get('/rainyday', function (req, res) {
        res.render('rainyday', { title: 'Express' });
    });
}

module.exports.SetRouter = SetRouter;