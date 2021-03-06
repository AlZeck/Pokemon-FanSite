<!DOCTYPE html>
<html>

<?php
include '../lib/php/dbcontroller.php';
$con = DBController::getController();
$pokemon = $con->getPokemonById($_GET["id"]);
$moves = $con->getMosseListByPokemon($_GET["id"]);
$colors = [
    "acciaio" => "#1D4C5E", "acqua" => "#114983", "buio" => "#1E1A25",
    "coleottero" => "#547904", "drago" => "#002B50", "elettro" => "#917908",
    "erba" => "#11500A", "folletto" => "#A940A3", "fuoco" => "#A74700",
    "ghiaccio" => "#187C6A", "lotta" => "#801334", "normale" => "#444B53",
    "ombra" => "#3E3355", "psico" => "#A20D14", "roccia" => "#7E6E3F",
    "sconosciuto" => "#44685E", "spettro" => "#193177", "terra" => "#9A3E0B",
    "veleno" => "#79339D", "volante" => "#3B5DA2", "fisico" => "#82150B"
];

if ($pokemon != NULL) {
    $raw_data  = file_get_contents('../assets/voci_pokedex/' . $pokemon["nome"] . '.json');
    $data = json_decode($raw_data, true);
} else {
    //header($_SERVER["SERVER_PROTOCOL"]." 404 Not Found", true, 404);
    include("../lib/php/notFound.php");
    sendError("Pokemon not found");
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
    <link href="/lib/css/pokemon.css" rel="stylesheet">
    <link href="/lib/css/stat.css" rel="stylesheet">
    <link href="/lib/css/tipi.css" rel="stylesheet">
    <script src="/lib/js/navbar.js"></script>
    <script src="/lib/js/navbarUtils.js"></script>
    <style>
        body {
            background-image: <?php echo 'url(../../assets/img/sfondi_tipi/' . $pokemon['tipo1'] . '.jpg)' ?>;
        }

        .nav-pills .nav-link.active,
        .nav-pills .show>.nav-link {
            color: #fff;
            background-color: <?php echo $colors[$pokemon['tipo1']] ?>;
        }

        a.nav-link {
            color: <?php echo $colors[$pokemon['tipo1']] ?>;
        }
    </style>
</head>

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
                            'href="/typedex/tipo.php?id=' . $pokemon['tipo1'] . '">'
                            . strtoupper($pokemon['tipo1']) . '</a>';

                        if ($pokemon['tipo2'] !== NULL) {
                            echo '<a class="btn btn-tipo ' . $pokemon['tipo2'] . '"' .
                                'href="/typedex/tipo.php?id=' . $pokemon['tipo2'] . '">'
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
                <br>
            </div>

            <!--IMAGINE-->
            <div class="col-sm-4">
                <div class="card pokecard">
                    <?php
                    echo '<img  class="card-img-top" src="/assets/pokemon/artwork/' . $pokemon["nome"] . '.png" alt="' . $pokemon["nome"] . '">';
                    ?>
                    <div class="card-body">
                        <div class="row row-sprites">
                            <div class="card">
                                <?php
                                echo '<img src="/assets/pokemon/mini_sprite/' . $pokemon["nome"] . '.png" alt="' . $pokemon["nome"] . '_mini_sprite">';
                                ?>
                            </div>
                            <div class="card">
                                <?php
                                echo '<img src="/assets/pokemon/front_sprite/' . $pokemon["nome"] . '.gif" alt="' . $pokemon["nome"] . '_front_sprite">';
                                ?>
                            </div>
                            <div class="card">
                                <?php
                                echo '<img src="/assets/pokemon/back_sprite/' . $pokemon["nome"] . '.gif" alt="' . $pokemon["nome"] . '_back_sprite">';
                                ?>
                            </div>

                        </div>
                    </div>
                </div>
                <br>
            </div>
        </div>
        <!-- Voci Pokedex -->
        <div class="card">
            <div class="card-header">
                <h3 class="card-title"> Voci pokedex </h3>
                <ul class="nav nav-pills card-header-pills ">
                    <?php
                    $numVoci = count($data);
                    echo '<li class="nav-item active">' .
                        '<a class="nav-link active" data-toggle="tab" href="#voce1">Voce 1</a>' .
                        '</li>';
                    for ($i = 2; $i < $numVoci + 1; $i++) {
                        echo '<li class="nav-item">' .
                            '<a class="nav-link" data-toggle="tab" href="#voce' . $i . '">Voce ' . $i . '</a>' .
                            '</li>';
                    }
                    ?>
                </ul>
            </div>
            <div class="card-body">
                <div class="tab-content">
                    <?php
                    if ($numVoci == 0) {
                        echo '<div id="voce1" class="tab-pane fade active show">' .
                            '<p>Non esistono voci per questo pokemon.</p>' .
                            '</div>';
                    } else {
                        function printGames($g)
                        {
                            $s = '<div class="row games-card-deck">';
                            foreach ($g as $game) {
                                //$s = $s . '<div class="card">';
                                $s = $s . '<img class="card mb-4" src="/assets/img/boxart/' . $game . '.png" alt="' . $game . '_boxart">';
                                //$s = $s . '</div>';
                            }
                            $s = $s . '</div>';
                            return $s;
                        }


                        foreach ($data as $key => $value) {
                            if ($key > 0) {
                                echo '<div id="voce' . ($key + 1) . '" class="tab-pane fade">' .
                                    '<div class="voce-text">' . $value['voce'] . '</div>' .
                                    printGames($value['giochi']) .
                                    '</div>';
                            } else {
                                echo '<div id="voce' . ($key + 1) . '" class="tab-pane fade active show">' .
                                    '<div class="voce-text">' . $value['voce'] . '</div>' .
                                    printGames($value['giochi']) .
                                    '</div>';
                            }
                        }
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
                    foreach ($moves as $mossa) {

                        echo '<div class="mb-4">' .
                                '<a class="card btn btn-tipo ' . $mossa["tipo"] . '" style="width: 185px; align-items:center; font-weight: bold;" ' .
                                    'href="/movedex/mossa.php?id=' . $mossa["id"] . '">' . ucfirst($mossa["nome"]) .
                                '</a>' .
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