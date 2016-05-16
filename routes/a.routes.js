var express = require('express');
var router = express.Router();
var runtime = require('../runtime');
var sqlexecutor = require('../sqlexecutor');

require('./default').push(router);
require('./index').push(router);
require('./blog').push(router);
require('./account').push(router);
require('./about').push(router);
require('./chat').push(router);
require('./test').push(router);
require('./test2').push(router);

module.exports = router;