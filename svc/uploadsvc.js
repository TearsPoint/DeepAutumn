var express = require('express');
var runtime = require('../runtime');
var sqlexec = require('../sqlexec');
var url = require('url');


function push(router) {
   
    //上传图片页
    router.get('/upload', function(req,res){
        res.render('upload', {title:"上传"});
    });

    router.post('/upload/base64', function(req, res) { 
        var str = req.param('imgstr');
        var matches = str.match(/^data:image\/([A-Za-z-+\/]+);base64,(.+)$/);

        if (matches.length !== 3) {
            res.status(500);
            res.send("-2");
        }

        var filetype = matches[1].replace("x-icon","ico");
        filetype = filetype.replace("jpeg","jpg");
        
        var data = new Buffer(matches[2], 'base64');
        var filename = Date.now() + '.' + filetype;
        fs.writeFile(__dirname + '/public/images/' + filename, data, function(err) { 
                if(err){
                    res.status(500);
                    res.send("-3");
                }
                res.send("images/" + filename);
        }); 
    });

}

module.exports.push = push;
