<!DOCTYPE html>
<html>

<head>
    <title>Movedex-PokemonFan Site</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <script src="https://code.jquery.com/jquery-3.2.1.min.js" integrity="sha384-xBuQ/xzmlsLoJpyjoggmTEz8OWUFM0/RC5BsqQBDX2v5cMvDHcMakNTNrHIW2I5f" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
    <link href="/lib/css/mossa.css" rel="stylesheet">
    <link href="/lib/css/tipi.css" rel="stylesheet">
    <script src="/lib/js/navbar.js"></script>
</head>

<?php
include '../lib/php/dbcontroller.php';
$con = DBController::getController();
$id = $_GET['id'];
$move = $con->getMossaById($id);
//\var_dump($info);
$pokelis = $con->getListPokemonByMossa($id);
//\var_dump($pokelis);
if($move==NULL){
    //header($_SERVER["SERVER_PROTOCOL"]." 404 Not Found", true, 404);
    include("../lib/php/notFound.php");
    sendError("Mossa not found");
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
                        <h3> <?php echo ucfirst($move["nome"]); ?> </h3>
                    </div>

                    <div role="group">
                        <?php
                        echo '<a class="btn btn-tipo ' . $move['tipo'] . '"' .
                            'href="/typedex/tipo.php?id=' . $move['tipo'] . '">'
                            . strtoupper($move['tipo']) . '</a>';
                        ?>
                        <?php
                        echo '<div class="btn btn-tipo ' . $move['categoria'] . '">' .
                            strtoupper($move['categoria']) . '</div>';
                        ?>
                    </div>
                </div>
                <br>
                <div class="card">
                    <div class="card-body">
                        <h3 class="card-title"> Descrizione </h3>
                        <?php echo $move["descrizione"]; ?>
                    </div>
                </div>
                <br>
            </div>
            <div class="col">
                <div class="card card-stat">
                    <div class="card-body">
                        <h3 class="card-title"> Statistiche </h3>
                        <?php
                        $stats = ["potenza", "precisione"];
                        $max = 250;
                        foreach ($stats as $stat) {
                            $val = $move[$stat];
                            $per = ((int) $val) * 100 / $max;
                            echo ' <div class="row"><div class="col-sm-4 stat-label">' . strtoupper($stat) . '</div><div class="col">';
                            echo '<div class="progress justify-content-between"> ' .
                                '<div class="progress-bar bar-stat-' . $stat . '" role="progressbar" aria-valuenow="' . $per .
                                '" aria-valuemin="0" aria-valuemax="270" style="width:' . $per . '%;">' . $val . '</div></div></div></div>';
                            if ($stat != "precisione") echo '<br>';
                            $max = 100;
                        }
                        ?>

                    </div>
                </div>
                <br>
            </div>
        </div>
        <div class="card">
            <div class="card-body">
                <h3 class="card-title"> Pokemon </h3>
                <div class="card-deck">

                    <?php
                    foreach ($pokelis as $pokemon) {

                        echo '<div class="mb-4">'.
                                '<div class="card pokecard">'.
                                    '<a href="/pokedex/pokemon.php?id=' . $pokemon["id"] . '">'.
                                        '<div class="card-body">'.
                                            '<h5 class="card-title"> <span class="number"> #' . $pokemon["id"] . '</span> '.
                                                ucfirst($pokemon["nome"]) . '</h5>'.
                                            '<img src="/assets/pokemon/artwork/' . $pokemon["nome"] . '.png" alt="' . $pokemon["nome"] . '">'.
                                        '</div>'.
                                    '</a>'.
                                '</div>'.
                            '</div>';
                    }


                    ?>

                </div>
            </div>
        </div>

    </div>
    <br>
</body>

</html>