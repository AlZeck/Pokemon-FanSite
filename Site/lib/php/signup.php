<?php

include 'dbcontroller.php';

$con = DBController::getController();

//inputUser, inputPsw

$user = $_POST['inputUser'];
$psw = md5($_POST['inputPsw']);


if(!$con->checkUsernameExists($user)){
    $ris = $con->addNewUser($user,$psw);
    if($ris){
        echo "success \n";
    }
    else{
        echo "errore \n";
    }
}
else{
    echo "utente registrato \n";
}    

