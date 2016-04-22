var express = require('express');
var router = express.Router();
var runtime = require('../runtime');
var sqlexecutor = require('../sqlexecutor');

require('./usersvc.js').SetRouter(router);
require('./usersvc2.js').SetRouter(router);

module.exports  = router;