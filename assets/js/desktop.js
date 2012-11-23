$(document).ready(function() {
    var $moveMe = $("#moveMe");

    socket = io.connect('http://192.168.1.4:8080');

    socket.on('connect', function() {
        socket.emit('initBrowser');
    });

    socket.on('sendBrowserId', function(selfBrowserId) {
        console.log(selfBrowserId);
        $("#browserId").text(selfBrowserId);
    });

    socket.on('sendGyro', function(alpha, beta, gamma) {
        console.log( alpha, beta, gamma );
        $("#debug").text( alpha + ' ' + beta + ' ' + gamma);

        $moveMe.css('top', ( Math.abs(gamma)*2)+50).css('left', (beta*5)+300);
    });

});