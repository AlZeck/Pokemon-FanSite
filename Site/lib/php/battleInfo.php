<?php
header('Content-Type: application/json');
include './dbcontroller.php';
$con = DBController::getController();
$info="";
if($_GET["type"]=="pokemon"){ // ?type=pokemon&id=[int]
    $info = $con->getPokemonById($_GET["id"]);
}elseif($_GET["type"]=="mossa"){ // ?type=mossa&id=[int]
    $info = $con->getMossaById($_GET["id"]);
}elseif($_GET["type"]=="search"){ // ?type=search&name=[string]
    $info = $con->searchByName($_GET["name"]);
}elseif($_GET["type"]=="moveset"){ // ?type=moveset&id=[int]
    $info = $con->getMosseListByPokemon($_GET["id"]);
}

echo json_encode($info,JSON_PRETTY_PRINT);
?>