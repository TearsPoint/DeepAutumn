/**
 * Created by 衡 on 15-5-17.
 */
var express = require('express');
var router = express.Router();
var runtime = require('../runtime');
var sqlexecutor = require('../sqlexecutor');

router.get('/login', function(req, res) {
    res.render('account/login', { title: 'Express' });
});

router.post('/LoginSvc', function(req, res) {
    runtime.Log("login_key:" + req.param('login_key'),1);
    var login_key = req.param('login_key');
    var login_pwd =req.param('login_pwd');
    var cpwd = runtime.md5(runtime.md5(login_pwd));
    runtime.Log("login_pwd:" + cpwd,1);

    sqlexecutor.ExecSql('SELECT COUNT(*) AS count FROM user ' +
        'where user_name = \''+ login_key +'\'' +
        'and pwd=\''+ cpwd +'\'' ,undefined, function(err, rows) {
        if(err){ log(err,3);}
        runtime.Log(rows[0].count,1);
        if(rows[0] === undefined){
            res.contentType('application/json');
            res.send('{"error":1}');
            return;
        }
        else if(rows[0].count>0)
        {
            //res.contentType('application/text');
            runtime.Log("[", login_key, "]登录成功");
            res.send("1");
            return;
        }
    });
    //res.send("-1");
});


router.get('/getwifi',function(req, res) {
    res.render('account/getwifi', { title: 'Express' });
});

router.get('/login_pv', function(req, res) {
    res.render('account/login_pv', { title: 'Express' });
});

router.post('/login_pv', function(req, res) {
    res.render('account/login_pv', { title: 'Express' });
});

module.exports = router;