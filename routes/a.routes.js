var express = require('express');
var router = express.Router();
var runtime = require('../runtime');
var sqlexecutor = require('../sqlexecutor');

require('./index').SetRouter(router);
require('./rainyday').SetRouter(router);
require('./blog').SetRouter(router);
require('./account').SetRouter(router);
require('./about').SetRouter(router);
require('./chat').SetRouter(router);
require('./jxdemo').SetRouter(router);
require('./wechat_sto').SetRouter(router);
require('./test').SetRouter(router);
require('./test2').SetRouter(router);

module.exports = router;