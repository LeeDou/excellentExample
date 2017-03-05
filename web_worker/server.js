var express = require('express'),
    app = express(),
    server = require('http').createServer(app);
    // io = require('socket.io').listen(server),
    // users=[];//保存所有在线用户的昵称
app.use('/', express.static(__dirname + '/www'));
server.listen(80);
console.log("server in localhost:80");

