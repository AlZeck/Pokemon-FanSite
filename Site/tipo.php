<?php
    include 'lib/php/dbcontroller.php';
    $con = DBController::getController();
    $mvs = $con->getListMovesByType($_GET["id"]);
    var_dump($mvs);
    $pks = $con->getListPokemonByType($_GET["id"]);
    var_dump($pks);
?>