/**
 * Created by 衡 on 15-5-17.
 */
var express = require('express');
var runtime = require('../runtime');
var sqlexecutor = require('../sqlexecutor');

function SetRouter(router) {
    /* GET blog page. */
    router.get('/blog', function (req, res) {
        res.render('blog', { title: 'Express' });
    });

    router.post('/blog', function (req, res) {
        res.render('blog', { title: 'Express' });
    });
}

module.exports.SetRouter = SetRouter;
