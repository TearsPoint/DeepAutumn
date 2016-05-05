/**
 * Created by 衡 on 15-5-17.
 */
var express = require('express');
var runtime = require('../runtime');
var sqlexecutor = require('../sqlexecutor');

function SetRouter(router) {
    /* GET about page. */
    router.get('/about', function (req, res) {
        res.render('about', { title: 'Express' });
    });
    router.post('/about', function (req, res) {
        res.render('about', { title: 'Express' });
    });
}

module.exports.SetRouter = SetRouter;