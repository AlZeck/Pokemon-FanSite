<?php
    include 'lib/php/dbcontroller.php';
    $con = DBController::getController();
    $pokemon = $con->getPokemonById($_GET["id"]);
    \var_dump($pokemon);
    echo '\n';
    $raw_data  = file_get_contents('./assets/voci_pokedex/'.$pokemon["nome"].'.json');
    $data = json_decode($raw_data, true);
    \var_dump($data);
?>