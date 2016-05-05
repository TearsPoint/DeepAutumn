/**
 * Created by 衡 on 15-5-17.
 */
var express = require('express');
var runtime = require('../runtime');
var sqlexecutor = require('../sqlexecutor');

function SetRouter(router) {
    /* GET chat page. */
    router.get('/wechat_sto', function (req, res) {
        res.render('wechat_sto', { title: 'Express' });
    });

    router.post('/wechat_sto', function (req, res) {
        res.render('wechat_sto', { title: 'Express' });
    });
}

module.exports.SetRouter = SetRouter;