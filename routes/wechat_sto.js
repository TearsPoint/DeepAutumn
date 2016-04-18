/**
 * Created by 衡 on 15-5-17.
 */
var express = require('express');
var router = express.Router();

/* GET chat page. */
router.get('/', function(req, res) {
    res.render('wechat_sto', { title: 'Express' });
});

router.post('/', function(req, res) {
    res.render('wechat_sto', { title: 'Express' });
});

module.exports = router;