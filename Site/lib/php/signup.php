<?php

include 'dbcontroller.php';

$con = DBController::getController();

//inputUser, inputPsw

$user = $_POST['inputUsr'];
$psw =md5($_POST['inputPsw']);

if(!$con->checkUsernameExists($user)){
    echo "utente non registrato";
    $ris = $con->addNewUser($user,$psw);
    if($ris){
        echo "succes";
    }
    else{
        echo "errore";
    }
}
else{
    echo "utente registrato";
}    

