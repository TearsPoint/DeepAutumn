/**
 * Created by 衡 on 15-1-19.
 */
var fs =require('fs');
var currentApp;


function md5(name){
    var crypto = require('crypto');
    return crypto.createHash('md5').update(name).digest('hex');
}

function log(str,level){
    var msg = "INFO";
    var file = "./deepautumn.log";
    if(level == 2){ msg = "WARN"; }
    else if(level == 3){ msg="ERR";file="./error.log"; }
    var str2 = msg + " [" + Date().toLocaleString() + "] " + str;
    console.log(str2);

    fs.appendFile(file, str2 + "\n", function (err) {
        if(err){
            console.log("Log Write Failed");
        }
    });
}

function key_value_pair()
{
    key = '';
    value = null;
};

Array.prototype.isExist = function(key)
{
    console.log('isExist for:',this);
    for(var i=0; i<this.length; i++)
    {
        console.log(this[i]);
        if(this[i].key==key)
            return true;
    }
    return false;
};

Array.prototype.getByKey = function(key)
{
    console.log('getByKey for:',this);
    for(var i=0; i<this.length; i++)
    {
        console.log(this[i]);
        if(this[i].key==key)
            return this[i];
    }
    return null;
};
//
//console.log('--test key-value-pair------------------------------------------------------');
//var kvs = [];
//var kv1 = new key_value_pair();
//kv1.key ='a';
//kv1.value = '1';
//kvs.push(kv1);
//var kv2 = new key_value_pair();
//kv2.key ='b';
//kv2.value = '2';
//kvs.push(kv2);
//
//console.log('kvs.isExist(a)' ,kvs.isExist('a'));
//console.log('kvs.getByKey(a)' ,kvs.getByKey('b'));
//console.log('--end test key-value-pair------------------------------------------------------');

var rootPath = __dirname;

module.exports.CurrentApp = currentApp;
module.exports.Log = log;
module.exports.RootPath = rootPath;
module.exports.md5 = md5;
module.exports.websocket_sessions = [];