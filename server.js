var express = require("express");
var app = express();
// var app = require('express').createServer();
var io = require('socket.io').listen(8080);

// routing
app.get('/', function (req, res) {
    res.sendfile(__dirname + '/index.html');
});

// io.set('log level', 1);


io.sockets.on('connection', function (socket) {

    socket.on('test', function() {
        socket.emit('test2', 'jea');
    });

    socket.on('disconnect', function() {

    });

    socket.on('ping', function(time) {
        socket.emit('ping', time);
    });
});

