// globals
var x = 0, y = 0, z = 0, socket, counter = 0;

$(document).ready(function() {
    var browserId = $("#browserId").text(),
        servername = $("body").data('servername');

    socket = io.connect('http://'+servername+':8080');

    socket.on('connect', function() {
        socket.emit('initPhone', browserId);
    });

    socket.on('phoneTest', function(message) {
        console.log(message);
    });

    socket.on('sendError', function(message) {
        alert( message );
    });

    socket.on('startAnimation', function(message) {
        // alert(message);
        updatePosition();
    });


});

function updatePosition() {
    counter++;
    $("#debug").text( counter );

    socket.emit('receiveGyro', x, y, z);

    // request new frame
    // requestAnimFrame(function() {
    //     updatePosition();
    // });
    setTimeout(function() {
        updatePosition();
    },100);
}

window.addEventListener('deviceorientation', function(event) {
    var alpha = event.alpha;
    var beta = event.beta;
    var gamma = event.gamma;

    // Update globals with orientation
    x = alpha;
    y = beta;
    z = gamma;

    // Update debug info with orientation
    document.getElementById("debug1").innerHTML = alpha;
    document.getElementById("debug2").innerHTML = beta;
    document.getElementById("debug3").innerHTML = gamma;

}, false);

// Paul Irish teh pro
// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
window.requestAnimFrame = (function(callback) {
    return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(callback){
        window.setTimeout(callback, 1000 / 60);
    };
})();