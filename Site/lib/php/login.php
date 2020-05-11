<?php
include 'dbcontroller.php';

$con = DBController::getController();

/* username, current-password */
$user = $_POST['username'];
$psw = $_POST['password'];
if ($con->checkUsernameExists($user)){
    $info = $con->getUserInfoByUsername($user);
    if ( password_verify($psw, $info['password']) ){ 
        if($_POST['check']=="true"){
            session_start(['cookie_lifetime' => 31536000]); // cookie that last a year :3
            setcookie("user",$user,time()+31536000,"/");
        } else {
            session_start();
            setcookie("user",$user,0,"/");
        }
        echo "success";
    }
    else{
        echo "error: password";
    }
}
else {
    echo "error: user";
}

