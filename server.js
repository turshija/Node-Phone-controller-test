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

function in_array(needle, haystack) {
    if ( haystack.indexOf( needle ) != -1) return true;
    else return false;
}

io.sockets.on('connection', function (socket) {

    socket.on('initBrowser', function() {
        var id = generateRandomString( 5 );
        // var id ="12345";

        socket.browserId = id;
        socket.isPhone = false;
        socket.join( id );

        browserPlayers.push( id );

        socket.emit('sendBrowserId', id);
    });

    socket.on('initPhone', function(browserId) {
        socket.isPhone = true;
        if (in_array(browserId, browserPlayers)) {
            socket.browserId = browserId;
            socket.join( browserId );
            console.log('Start animation');
            socket.emit('startAnimation','jej?');
        } else {
            console.log('Invalid browser id');
            socket.emit('sendError','Invalid browser id !');
        }
    });

    socket.on('receiveGyro', function(alpha, beta, gamma) {
        // console.log( alpha, beta, gamma);
        io.sockets.in( socket.browserId ).emit('sendGyro', alpha, beta, gamma);
    });

    socket.on('disconnect', function() {
        if ( !socket.isPhone ) {
            var id = socket.browserId,
                index = browserPlayers.indexOf( id );
            // remove ID from browserPlayers
            browserPlayers.splice(index, 1);

            console.log('Disconnected',id);
        }
        socket.leave( socket.browserId );
    });

    socket.on('ping', function(time) {
        socket.emit('ping', time);
    });
});