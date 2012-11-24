$(document).ready(function() {
    var $qrCode = $("#qrCode"),
        $loadingDiv = $("#loadingDiv"),
        $content = $("#content"),
        servername = $("body").data('servername');

    try {
        socket = io.connect('http://'+servername+':8080');
    } catch (e) {
        $loadingDiv.text('It looks like our server is down at the moment :( Sorry');
        return false;
    }
    $loadingDiv.hide();
    $content.show();

    socket.on('connect', function() {
        socket.emit('initBrowser');
    });

    socket.on('sendBrowserId', function(selfBrowserId) {
        // console.log(selfBrowserId);
        $("#browserId").text(selfBrowserId);
        $qrCode.show().attr( 'src', $qrCode.data('imgsrc') + selfBrowserId );
    });

    socket.on('sendGyro', function(alpha, beta, gamma) {
        console.log( alpha, beta, gamma );
        $("#debug").text( alpha + ' ' + beta + ' ' + gamma);

        $qrCode.css('top', ( Math.abs(gamma)*2)+50).css('left', (beta*5)+300);
    });

});