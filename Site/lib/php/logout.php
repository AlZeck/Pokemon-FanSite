<?php
    session_start();
    session_unset();
    session_destroy();
    $cookie_name = 'PHPSESSID';
    unset($_COOKIE[$cookie_name]);
    // empty value and expiration one hour before
    $res = setcookie($cookie_name, '', time() - 3600);
?>