var runtime = require('./runtime');
var config =require('./config');
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
//var jade = require('jade');
var cache = require('memory-cache');
var mysql = require('mysql');
var marked = require('marked');
var favicon = require('serve-favicon');
//var wait =require('wait.for');
var fs = require("fs");
var http = require('http');
var WebSocket = require('faye-websocket-node'),
    deflate   = require('permessage-deflate'),
    https     = require('https');
var port    = config.web_port,
    secure  = 0,
    options = {extensions: [deflate], ping: 5};

runtime.CurrentApp = app;

//定义路由
var routes = require('./routes/index');
var rainyday = require('./routes/rainyday');
var blog = require('./routes/blog');
var account = require('./routes/account');
var about = require('./routes/about');
var chat = require('./routes/chat');
var jxdemo = require('./routes/jxdemo');
var wechat_sto = require('./routes/wechat_sto');
var test = require('./routes/test');
var svc = require('./svc/svc');

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.use(logger('dev'));
//app.use(bodyParser({limit:'10mb'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/',routes);
app.use('/rainyday',rainyday);
app.use('/blog',blog);
app.use('/account',account);
app.use('/about',about);
app.use('/chat',chat);
app.use('/jxdemo',jxdemo);
app.use('/wechat_sto',wechat_sto);
app.use('/test',test);
app.use('/svc',svc);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;

server.listen(config.web_port);
io.sockets.on('connection', function (socket) {
    console.log('io.socket.onconnection');
//    socket.emit('news', { hello: 'world' });
//    socket.on('my other event', function (data)
//       console.log('ccc');
//    });
});


var websocketsession = require('./websocket_session');
var clientcount = 0;

var upgradeHandler = function(request, socket, head) {
    var ws = new WebSocket(request, socket, head, ['irc', 'xmpp'], options);
    console.log('[进行 AcceptConn... 有新客户端建立连接]',
        ws.url, ws.version, ws.protocol);

    //新连接建立新的 websocketsession
    var wss = new websocketsession();
    wss.uid=++clientcount;
    wss.set_web_socket_client(ws);
    //console.log('[wss]',wss);
    runtime.websocket_sessions.push(wss);
};


//var requestHandler = function(request,response)
//{
//    var path = request.url;
//    if(path.indexOf('.html')>0)
//    {
//        console.log('request-url',path);
//        console.log('readFile:',__dirname+path);
//        fs.readFile(__dirname+path,function(err,content)
//            {
//                var status = err? 404 : 200;
//                response.writeHead(status,{'Content-Type':'text/html'});
//                response.write(content || 'Not fond');
//                response.end();
//            }
//        );
//        return;
//    }
//}
//
//server.on('request', requestHandler);
server.on('upgrade', upgradeHandler);
console.log('服务启动完毕');

//监听web请求
//app.listen(config.web_port);
//app.listen();

var nums = [3, 1, 2, 7, 9, 8];

console.log(nums instanceof Array);
console.log(Object.prototype.toString.call(nums)=='[object Array]');

nums.reverse();   //反转
console.log('reverse():',nums);

var orderByDesc = function(num1,num2)
{
    if(num2>num1)
        return true;
}

var orderByEsc = function(num1,num2)
{
    if(num1>num2)
        return true;
}

Array.prototype.orderByDesc = function()
{
    Array.prototype.sort.call(this,function(num1,num2)
    {
        if(num2>num1)
            return true;
    });
    return this;
};


Array.prototype.orderByEsc = function()
{
    Array.prototype.sort.call(this,function(num1,num2)
    {
        if(num1>num2)
            return true;
    });
    return this;
};

//nums.sort(orderByDesc);
console.log('sortDesc:',nums.orderByDesc());
//nums.sort(orderByEsc);
console.log('sortEsc:',nums.orderByEsc());

nums.splice(0, 1,'a');
console.log(nums);  // [1, 2, 3, 4, 5, 6, 7, 8, 9]

nums = nums.slice(0, 1);
console.log(nums);

var up = function(grade,index,current) {
    var r = grade += 5;
    return r;
}
var grades = [72, 65, 81, 92, 85];
var newGrades = grades.map(up,2);
console.log(newGrades);


var objInArray = [
    {
        name: 'king',
        pass: '123',
        index: 2
    },
    {
        name: 'king1',
        pass: '234',
        index: 1
    }
];

// 对数组中的对象元素，根据index进行升序
var compare = function(o1, o2) {
    return o1.index > o2.index;
};
objInArray.sort(compare);
console.log(objInArray); // true
