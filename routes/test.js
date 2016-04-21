/**
 * Created by 衡 on 16-04-20.
 */
var express = require('express');
var router = express.Router();
var runtime = require('../runtime');
var sqlexecutor = require('../sqlexecutor');

/* GET test page. */
router.get('/', function(req, res) {
    var data;
     sqlexecutor.ExecSql('select * from chinesecharactercode limit 1000;',undefined, function(err,rows) {
        if(err) log(err,3);
        else{
            data = rows;
            var propertys = Object.getOwnPropertyNames(rows[0]);
            console.log(propertys);
            res.render('test', { title: 'test', data:data });
        }
    }
    );
});

module.exports = router;