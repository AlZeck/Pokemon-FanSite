<!DOCTYPE html>
<html>

<?php
include '../lib/php/dbcontroller.php';
$con = DBController::getController();
$tipo = $_GET["id"];
$mvs = $con->getListMovesByType($tipo);
$pks = $con->getListPokemonByType($tipo);
$eff = ["superefficace" => "Superefficace", "poco_efficace" => "Poco efficace", "inefficace" => "Inefficace"];

if ($con->checkTipoExists($tipo)) {
    $raw_data  = file_get_contents('../assets/efficacie_tipo/' . $tipo . '.json');
    $data = json_decode($raw_data, true);
} else {
    //header($_SERVER["SERVER_PROTOCOL"]." 404 Not Found", true, 404);
    include("../lib/php/notFound.php");
    sendError("Tipo not found");
    die();
}
?>

<head>
    <title>Pokedex-PokemonFan Site</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="Un fansite sui pokemon che permette di conoscere di più sul loro mondo e di fare battaglie nel simulatore">
    <meta name="keywords" content="pokemon, battaglia, pokedex, movedex, typedex">
    <meta name="author" content="Juan Sebastian Arboleda Polo (1805920), Andrea Cerone (1770688), Matteo Di Stadio (1794111)">
    <meta name="copyright" content="The Pokémon Company">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    <script src="https://code.jquery.com/jquery-3.2.1.min.js" integrity="sha384-xBuQ/xzmlsLoJpyjoggmTEz8OWUFM0/RC5BsqQBDX2v5cMvDHcMakNTNrHIW2I5f" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
    <link href="/lib/css/tipo.css" rel="stylesheet">
    <link href="/lib/css/stat.css" rel="stylesheet">
    <link href="/lib/css/tipi.css" rel="stylesheet">
    <script src="/lib/js/navbar.js"></script>
    <script src="/lib/js/navbarUtils.js"></script>
    <style>
        body {
            background-image: <?php echo 'url(../../assets/img/sfondi_tipi/' . $tipo . '.jpg)' ?>;
        }
    </style>
</head>


<body>
    <br>
    <div class="container">
        <!-- <h2 class="type-header"><php echo ucfirst($tipo); ?></h2> -->
        <div class="media">
            <div class="media-body">
                <h2 class="mt-0 mb-1"><?php echo ucfirst($tipo); ?></h2>
            </div>
            <img src="/assets/img/typedex/<?php echo $tipo; ?>.png" class="align-self-center ml-3" alt="<?php echo $tipo; ?>" style="max-width:40px; max-height:40px;">
        </div>
        <br>
        <div class="row">
            <div class="col">
                <div class="card eff-card">
                    <div class="card-header">
                        <h4 class="card-title">Offensivo</h4>
                    </div>
                    <div class="card-body">
                        <?php
                        $lis = $data['offensivo'];
                        foreach ($eff as $name => $title) {
                            if ($name != "superefficace") echo '<hr>';
                            echo '<strong>' . $title . '</strong>';
                            echo '<div class="card-deck">';
                            if ($lis[$name] != []) {
                                foreach ($lis[$name] as $currtype) {
                                    echo '<a class="btn btn-tipo ' . $currtype . '"' .
                                        'href="/typedex/tipo.php?id=' . $currtype . '">'
                                        . strtoupper($currtype) . '</a>';
                                }
                            } else {
                                echo '<a class="btn btn-tipo btn-void disabled" href="">NULL</a>';
                            }
                            echo '</div>';
                        }
                        ?>
                    </div>
                </div>
                <br>
            </div>
            <div class="col">
                <div class="card eff-card">
                    <div class="card-header">
                        <h4 class="card-title">Difensivo</h4>
                    </div>
                    <div class="card-body">
                        <?php
                        $lis = $data['diffensivo'];
                        foreach ($eff as $name => $title) {
                            if ($name != "superefficace") echo '<hr>';
                            echo '<strong>' . $title . '</strong>';
                            echo '<div class="card-deck">';
                            if ($lis[$name] != []) {
                                foreach ($lis[$name] as $currtype) {
                                    echo '<a class="btn btn-tipo ' . $currtype . '"' .
                                        'href="/typedex/tipo.php?id=' . $currtype . '">'
                                        . strtoupper($currtype) . '</a>';
                                }
                            } else {
                                echo '<a class="btn btn-tipo btn-void disabled" href="">NULL</a>';
                            }
                            echo '</div>';
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
                    foreach ($pks as $pokemon) {

                        echo '<div class="mb-4">' .
                            '    <div class="card pokecard">' .
                            '        <a href="/pokedex/pokemon.php?id=' . $pokemon["id"] . '">' .
                            '        <div class="card-body">' .
                            '           <h5 class="card-title"> <span class="number"> #' . $pokemon["id"] . '</span> ' .
                            '                ' . ucfirst($pokemon["nome"]) . '</h5>' .
                            '           <img src="/assets/pokemon/artwork/' . $pokemon["nome"] . '.png" alt="' . $pokemon["nome"] . '">' .
                            '        </div>' .
                            '        </a>' .
                            '    </div>' .
                            '</div>';
                    }
                    ?>

                </div>
            </div>
        </div>
        <br>
        <div class="card">
            <div class="card-body">
                <h3 class="card-title"> Mosse </h3>
                <div class="card-deck">
                    <?php
                    foreach ($mvs as $mossa) {
                        echo '<div class="mb-4">' .
                            '   <a class="card btn ' . $mossa["tipo"] . '" style="width: 185px; align-items:center; font-weight: bold;" ' .
                            '       href="/movedex/mossa.php?id=' . $mossa["id"] . '">' . ucfirst($mossa["nome"]) .
                            '   </a>' .
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