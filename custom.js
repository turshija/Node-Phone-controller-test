$(document).ready(function() {
    var browserId = $("#browserId").text();

    socket = io.connect('http://127.0.0.1:8080');

    // Computer browser stuff
    socket.on('connect', function(){
        socket.emit('initBrowser');
    });

    socket.on('sendBrowserId', function(selfBrowserId) {
        console.log(selfBrowserId);
        $("#phoneId").text(selfBrowserId);
    });

});