/**
 * Created by 衡 on 16-04-20.
 */
var express = require('express');
var runtime = require('../runtime');
var sqlexec = require('../sqlexec');

function push(router) {
    /* GET test page. */
    router.get('/test2', function (req, res) {
        var data;
        //sqlexec.ExecSql('select * from chinesecharactercode limit 1000;',undefined, function(err,rows) {
        //if(err) log(err,3);
        //else{
        //data = rows;
        //var propertys = Object.getOwnPropertyNames(rows[0]);
        //console.log(propertys);
        res.render('test2', { title: 'test2' });
        //}
        //}
        //);
    });
}

module.exports.push = push;