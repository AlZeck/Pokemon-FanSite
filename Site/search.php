<!DOCTYPE html>
<html>

<?php
include 'lib/php/dbcontroller.php';
$con = DBController::getController();
$s = str_replace("'", "''", $_GET['s']);
$lis = $con->searchByName($s);
if ($lis == NULL) {
    include("./lib/php/notFound.php");
    sendError($_GET['s'] . " not found");
    die();
}
?>

<head>
    <title>PokemonFan Site</title>
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
    <link href="/lib/css/search.css" rel="stylesheet">
    <link href="/lib/css/tipi.css" rel="stylesheet">
    <script src="/lib/js/navbar.js"></script>
    <script src="/lib/js/navbarUtils.js"></script>
</head>

<body>
    <br>
    <div class="container">
        <div class="card-deck">
            <?php
            foreach ($lis as $item) {
                if($item['tab'] == '1'){
                    echo    '<div class="mb-4">'.
                                    '<div class="card">'.
                                            '<a href="/pokedex/pokemon.php?id=' . $item["id"] . '">'.
                                            '<div class="card-body">'.
                                                '<h5 class="card-title"> <span class="number">#'.$item["id"].' </span>'
                                                    . ucfirst($item["nome"]) . '</h5>'.
                                                '<img src="/assets/pokemon/artwork/' . $item["nome"] . '.png" alt="' . $item["nome"] . '">'.
                                            '</div>'.
                                        '</a>'.
                                    '</div>'.
                                '</div>';
                }
                elseif($item['tab'] == '2'){
                    echo    '<div class="mb-4">'.
                                '<div class="card">'.
                                '<a href="/movedex/mossa.php?id=' . $item["id"] . '">'.
                                    '<div class="card-body">'.
                                        '<h5 class="card-title">' . ucfirst($item["nome"]) . '</h5>'.
                                        '<img src="/assets/img/mosse/' . $item["tipo"] . '.png" alt="' . $item["nome"] . '">'.
                                    '</div>'.
                                '</a>'.
                            '</div>'.
                        '</div>';
                }
                else {
                    echo    '<div class="mb-4">'.
                            '<div class="card">'.
                                '<a href="/typedex/tipo.php?id=' . $item['nome'] . '">'.
                                    '<div class="card-body">'.
                                        '<h3 class="card-title">' . strtoupper($item['nome']) . '</h3>'.
                                        '<img src="/assets/img/typedex/'.$item['nome'] . '.png" alt="' . $item["nome"] . '">'.
                                    '</div>'.
                                '</a>'.
                            '</div>'.
                        '</div>';
                }
            }


            ?>

        </div>
    </div>
    <br>
</body>

</html>