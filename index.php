<?php
$url = 'http://' . $_SERVER['SERVER_NAME'] . dirname($_SERVER['PHP_SELF']);
?>
<html>
<head>
    <title>Test</title>
    <style type="text/css">
    #moveMe {
        transition: top 0.1s, left 0.1s, transform 2s;
        -moz-transition: top 0.1s, left 0.1s, -moz-transform 2s;
        -webkit-transition: top 0.1s, left 0.1s, -webkit-transform 2s;
        -o-transition: top 0.1s, left 0.1s,-o-transform 2s;
    }
    </style>
</head>
<body data-servername="<?php echo $_SERVER['SERVER_NAME'] ?>">
    <h1>Node test :)</h1>

    Open this on phone: <?php echo $url ?>/phone.php?id=<span id="browserId"></span>

    <div id="debug"></div>

    <div id="moveMe" style="width:100px;height:100px;border:1px solid #000;left:200px;top:50px;position:relative">&nbsp;</div>

    <script src="http://static2.gametracker.rs/javascript/vendor/jquery.min.js"></script>
    <script src="http://<?php echo $_SERVER['SERVER_NAME'] ?>:8080/socket.io/socket.io.js"></script>
    <script src="assets/js/desktop.js"></script>
</body>
</html>