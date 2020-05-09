<!DOCTYPE html>
<html>

<head>
    <title>Pokedex-PokemonFan Site</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
    <link href="lib/css/pokemon.css" rel="stylesheet">
    <link href="lib/css/tipi.css" rel="stylesheet">
    <script src="lib/js/navbar.js"></script>

</head>

<?php
include 'lib/php/dbcontroller.php';
$con = DBController::getController();
$pokemon = $con->getPokemonById($_GET["id"]);
$moves = $con->getMosseListByPokemon($_GET["id"]);
if ($pokemon != NULL) {
    $raw_data  = file_get_contents('./assets/voci_pokedex/' . $pokemon["nome"] . '.json');
    $data = json_decode($raw_data, true);
} else {
    //header($_SERVER["SERVER_PROTOCOL"]." 404 Not Found", true, 404);
    include("lib/php/notFound.php");
    sendError("Pokemon not found");
    die();
}

?>


<body>

    <br>
    <div class="container">
        <div class="row">
            <div class="col">
                <div class="btn-toolbar justify-content-between" role="toolbar">
                    <div role="group">
                        <h3> <?php echo ucfirst($pokemon["nome"]); ?> </h3>
                    </div>

                    <div class="btn-group" role="group">
                        <?php
                        echo '<a class="btn btn-tipo ' . $pokemon['tipo1'] . '"' .
                            'href="./tipo.php?id=' . $pokemon['tipo1'] . '">'
                            . strtoupper($pokemon['tipo1']) . '</a>';

                        if ($pokemon['tipo2'] !== NULL) {
                            echo '<a class="btn btn-tipo ' . $pokemon['tipo2'] . '"' .
                                'href="./tipo.php?id=' . $pokemon['tipo2'] . '">'
                                . strtoupper($pokemon['tipo2']) . '</a>';
                        }
                        ?>
                    </div>
                </div>
                <br>
                <div class="card">
                    <div class="card-body card-stat">
                        <h3 class="card-title"> Statistiche </h3>
                        <?php
                        $stats = ["ps", "att", "dif", "attsp", "difsp", "vel"];

                        foreach ($stats as $stat) {
                            $val = $pokemon[$stat];
                            $per = ((int) $val) * 100 / 270;
                            echo ' <div class="row"><div class="col-sm-2 stat-label">' . strtoupper($stat) . '</div><div class="col">';
                            echo '<div class="progress justify-content-between"> ' .
                                '<div class="progress-bar bar-stat-' . $stat . '" role="progressbar" aria-valuenow="' . $per .
                                '" aria-valuemin="0" aria-valuemax="270" style="width:' . $per . '%;">' . $val . '</div></div></div></div>';
                            if ($stat != "vel") echo '<br>';
                        }

                        ?>
                    </div>
                </div>
            </div>

            <!--IMAGINE-->
            <div class="col-sm-4">
                <div class="card pokecard">
                    <?php
                    echo '<img  class="card-img-top" src="assets/pokemon/artwork/' . $pokemon["nome"] . '.png" alt="' . $pokemon["nome"] . '">';
                    ?>
                    <div class="card-body">
                        <div class="card-deck">
                            <div class="card">
                                <?php
                                echo '<img src="assets/pokemon/mini_sprite/' . $pokemon["nome"] . '.png" alt="' . $pokemon["nome"] . '_mini_sprite">';
                                ?>
                            </div>
                            <div class="card">
                                <?php
                                echo '<img src="assets/pokemon/front_sprite/' . $pokemon["nome"] . '.gif" alt="' . $pokemon["nome"] . '_front_sprite">';
                                ?>
                            </div>
                            <div class="card">
                                <?php
                                echo '<img src="assets/pokemon/back_sprite/' . $pokemon["nome"] . '.gif" alt="' . $pokemon["nome"] . '_back_sprite">';
                                ?>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        <br>
        <div class="card">
            <div class="card-body">
                <h3 class="card-title"> Voci pokedex </h3>
            </div>
            <!-- //TODO -->
        </div>
        <br>
        <div class="card">
            <div class="card-body">
                <h3 class="card-title"> Mosse </h3>
                <div class="card-deck">

                    <?php
                    foreach ($moves as $mossa) {

                        echo    '<div class="mb-4">' .
                            '<a class="card btn btn-tipo ' . $mossa["tipo"] . '" style="width: 185px; align-items:center; font-weight: bold;" ' .
                            'href="./mossa.php?id=' . $mossa["id"] . '">' . ucfirst($mossa["nome"]) .
                            //'<img src="assets/img/mosse/' . $mossa["tipo"] . '.png" alt="' . $mossa["nome"] . '">'.
                            //'</div>'.
                            '</a>' .
                            //'</div>'.
                            '</div>';
                    }


                    ?>


                </div>


            </div>

        </div>


</body>

</html>