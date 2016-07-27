var runtime = require('./runtime');
var config =require('./config');
var express = require('express');
var session = require('express-session');
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
var routes = require('./routes/a.routes');
var svc = require('./svc/a.svc');

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.use(logger('dev'));
//app.use(bodyParser({limit:'10mb'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser('attention')); 
app.use(session({ secret: 'attention'}));
app.use(express.static(path.join(__dirname, 'public')));

//定义路由
app.use('/',routes);
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

//server.on('request', requestHandler);
server.on('upgrade', upgradeHandler);
console.log('服务启动完毕');

//监听web请求
//app.listen(config.web_port);
//app.listen();
