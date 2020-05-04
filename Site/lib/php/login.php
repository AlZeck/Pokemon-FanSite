<?php
include 'dbcontroller.php';

$con = DBController::getController();

/* inputUser, inputPsw */
$user = $_POST['inputUser'];
$psw = md5($_POST['inputPsw']);

if ($con->checkUsernameExists($user)){
    $info = $con->getUserInfoByUsername($user);
    if ( $psw == $info[1] ){ 
        echo "success \n";
    }
    else{
        echo "password sbagliata \n";
    }
}
else {
    echo "utente non trovato \n";
}

