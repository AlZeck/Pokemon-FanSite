<?php 
    include '../lib/php/dbcontroller.php';
    $con = DBController::getController();
    $id = $_GET['id'];
    $info = $con->getMossaById($id);
    \var_dump($info);
    $pokelis = $con->getListPokemonByMossa($id);
    \var_dump($pokelis);
?>