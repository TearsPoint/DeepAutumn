var express = require('express');
var runtime = require('../runtime');
var sqlexec = require('../sqlexec');
var url = require('url');


function push(router) {
    router.get('/eventsvc', function (req, res) {
        res.contentType('application/json');
        
        res.send('{"eventsvc":1}');
    });

    router.get('/wxcheck', function (req, res) {
        var param = url.parse(req.url, true).query;
        res.send(param.echostr);
    });

}

module.exports.push = push;


//GET /svc/wxcheck?signature=8cfa79918f69a736850d92e024c05660781cc1fa&echostr=717501845316042663&timestamp=1471931942&nonce=2080273500 200 4.394 ms - 9