var express = require('express');
var runtime = require('../runtime');
var sqlexecutor = require('../sqlexecutor');

function SetRouter(router) {
    router.get('/eventsvc', function (req, res) {
        res.contentType('application/json');
        
        res.send('{"eventsvc":1}');
    });
}

module.exports.SetRouter = SetRouter;