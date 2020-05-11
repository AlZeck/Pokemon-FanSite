<?php
header('Content-Type: application/json');
include './dbcontroller.php';
$con = DBController::getController();
$info="";
if($_GET["type"]=="pokemon"){
    $info = $con->getPokemonById($_GET["id"]);
}elseif($_GET["type"]=="mossa"){
    $info = $con->getMossaById($_GET["id"]);
}elseif($_GET["type"]=="search"){
    $info = $con->searchByName($_GET["name"]);
}
echo json_encode($info,JSON_PRETTY_PRINT);
?>