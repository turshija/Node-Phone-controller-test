var express = require("express");
var app = express();
// var app = require('express').createServer();
var io = require('socket.io').listen(8080);

// routing
app.get('/', function (req, res) {
    res.sendfile(__dirname + '/index.html');
});
io.set('log level', 2);

var browserPlayers = [];

function generateRandomString(len, charSet) {
    charSet = charSet || 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    var output = '';
    for (var i = 0; i < len; i++) {
        var randomPoz = Math.floor(Math.random() * charSet.length);
        output += charSet.substring(randomPoz,randomPoz+1);
    }
    return output;
}

io.sockets.on('connection', function (socket) {

    socket.on('initBrowser', function() {
        var id = generateRandomString( 5 );

        socket.browserId = id;
        browserPlayers.push( id );

        console.log(browserPlayers);
        socket.emit('sendBrowserId', id);
    });

    socket.on('disconnect', function() {
        var id = socket.browserId,
            index = browserPlayers.indexOf( id );
        // remove ID from browserPlayers
        browserPlayers.splice(index, 1);

        console.log('Disconnected',id);
    });

    socket.on('ping', function(time) {
        socket.emit('ping', time);
    });
});