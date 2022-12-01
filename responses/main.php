<?php
date_default_timezone_set('Asia/Tbilisi');
$date = date('d/m/Y H:i', time());
$files = scandir('allfiles');
$filename = $_SERVER['REMOTE_ADDR'];

if(isset($_POST['field1'])) {
    $data = "\r\n" . $date . "\r\n" . $_POST['field1'] . "\r\n";
    $data_raw = $_POST['field1'] . "\r\n";
    $data_cookie = $_COOKIE['device'] . "\r\n";

    $ret = file_put_contents('userinputs.txt', $data_raw, FILE_APPEND | LOCK_EX);

    if (file_exists($filename)) {
        $ret = file_put_contents($filename, $data, FILE_APPEND | LOCK_EX);
    }else{
        $f = fopen($filename, 'wb');
        $re0 = file_put_contents($filename, $data_cookie, FILE_APPEND | LOCK_EX);
        $ret = file_put_contents($filename, $data, FILE_APPEND | LOCK_EX);
    }
    if($ret === false) {
        die('There was an error writing this file');
    }
    else {
        echo "$ret bytes written";
    }
}
else {
   die('no post data to process');
}