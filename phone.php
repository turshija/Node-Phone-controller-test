<?php
$url = dirname($_SERVER['PHP_SELF']);
?>
<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <title>Phone test</title>
</head>
<body data-servername="<?php echo $_SERVER['SERVER_NAME'] ?>">
    <span id="browserId"><?php echo $_GET['id'] ?></span>

    <br />
    <span id="debug">0</span>
    <br /><br />
    <span id="debug1"></span><br />
    <span id="debug2"></span><br />
    <span id="debug3"></span><br />

    <script src="http://static2.gametracker.rs/javascript/vendor/jquery.min.js"></script>
    <script src="http://<?php echo $_SERVER['SERVER_NAME'] ?>:8080/socket.io/socket.io.js"></script>
    <script src="assets/js/phone.js"></script>
</body>
</html>