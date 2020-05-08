<?php 
    include 'lib/php/dbcontroller.php';
    $con = DBController::getController();
    $lis = $con->getMosseList();
    \var_dump($lis);
?>