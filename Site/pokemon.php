<?php
    include 'lib/php/dbcontroller.php';
    $con = DBController::getController();
    $pokemon = $con->getPokemonById($_GET["id"]);
    \var_dump($pokemon);
?>