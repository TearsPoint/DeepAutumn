/**
 * Created by 衡 on 15-5-16.
 */
var express = require('express');
var runtime = require('../runtime');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', { title: 'Express' });
});

router.get('/contact',function(req,res){
        res.render('contact',{} );
    }
);
router.post('/contact',function(req,res){
        res.render('contact',{} );
    }
);


router.get('/timeline',function(req,res){
        res.render('timeline',{} );
    }
);
router.post('/timeline',function(req,res){
        res.render('timeline',{} );
    }
);


router.get('/mall',function(req,res){
        res.render('mall',{} );
    }
);
router.post('/mall',function(req,res){
        res.render('mall',{} );
    }
);


router.get('/jxdemo',function(req,res){
        res.render('jxdemo',{} );
    }
);

module.exports = router;
