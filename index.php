<?php
$url = 'http://' . $_SERVER['SERVER_NAME'] . dirname($_SERVER['PHP_SELF']) . "/phone.php?id=";
$qrUrl = 'http://chart.apis.google.com/chart?cht=qr&chs=150x150&chld=H|0&chl='.$url;
?>
<html>
<head>
    <title>Test</title>
    <style type="text/css">
    #qrCode {
        width:150px;
        height:150px;
        border:1px solid #000;
        position:relative;
        left:200px;
        top:50px;

        display: block;

        /* CSS3 movement smoothing, so that movement doesn't get too "jumpy" */
        transition: top 0.1s, left 0.1s, transform 2s;
        -moz-transition: top 0.1s, left 0.1s, -moz-transform 2s;
        -webkit-transition: top 0.1s, left 0.1s, -webkit-transform 2s;
        -o-transition: top 0.1s, left 0.1s,-o-transform 2s;
    }
    #content {
        display: none;
    }
    </style>
</head>
<body data-servername="<?php echo $_SERVER['SERVER_NAME'] ?>">
    <h1>Phone controller test</h1>

    <div id="loadingDiv">Loading...</div>

    <div id="content">
        Open this on phone: <?php echo $url ?><span id="browserId"></span>

        <div id="debug"></div>

        <img src="" id="qrCode" data-imgsrc="<?php echo $qrUrl ?>" />
    </div>

    <script src="http://static2.gametracker.rs/javascript/vendor/jquery.min.js"></script>
    <script src="http://<?php echo $_SERVER['SERVER_NAME'] ?>:8080/socket.io/socket.io.js"></script>
    <script src="assets/js/desktop.js"></script>
</body>
</html>