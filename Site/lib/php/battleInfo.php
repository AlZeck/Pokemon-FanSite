<?php
include './dbcontroller.php';
$con = DBController::getController();
$info="";
if($_GET["type"]=="pokemon"){
    $info = $con->getPokemonById($_GET["id"]);
}elseif($_GET["type"]=="mossa"){
    $info = $con->getMossaById($_GET["id"]);
}
echo json_encode($info);
?>