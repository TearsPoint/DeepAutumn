var express = require('express');
var router = express.Router();
var runtime = require('../runtime');
var sqlexecutor = require('../sqlexecutor');

require('./usersvc.js').push(router);
require('./eventsvc.js').push(router);

module.exports  = router;