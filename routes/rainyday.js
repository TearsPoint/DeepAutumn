/**
 * Created by 衡 on 15-5-16.
 */
var express = require('express');
var router = express.Router();

/* GET rainyday page. */
router.get('/', function(req, res) {
    res.render('rainyday', { title: 'Express' });
});

module.exports = router;