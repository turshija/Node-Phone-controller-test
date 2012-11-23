window.onload = function() {
    socket = io.connect('http://127.0.0.1:8080');

    socket.on('connect', function(){
        socket.emit('test');
    });

    socket.on('test2', function(param1) {
        console.log(param1);
    });
}