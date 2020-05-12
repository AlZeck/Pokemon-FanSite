<?php

include 'dbcontroller.php';

$con = DBController::getController();

//username, new-password

$user = $_POST['username'];
$psw = password_hash($_POST['password'], PASSWORD_BCRYPT, ["cost" => 10]);

if(!$con->checkUsernameExists($user) && $user!='CPU'){
    $ris = $con->addNewUser($user,$psw);
    if($ris){
        echo "success";
    }
    else{
        echo "error";
    }
}
else{
    echo "error: user";
}    

