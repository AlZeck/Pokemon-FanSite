<!DOCTYPE html>
<html>
<?php
include '../lib/php/dbcontroller.php';
$con = DBController::getController();
$lis = $con->getPokemonList();
?>

<head>
    <title>Pokedex-PokemonFan Site</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="Un fansite sui pokemon che permette di conoscere di più sul loro mondo e di fare battaglie nel simulatore">
    <meta name="keywords" content="pokemon, battaglia, pokedex, movedex, typedex">
    <meta name="author" content="Juan Sebastian Arboleda Polo (1805920), Andrea Cerone (1770688), Matteo Di Stadio (1794111)">
    <meta name="copyright" content="The Pokémon Company">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <script src="https://code.jquery.com/jquery-3.2.1.min.js" integrity="sha384-xBuQ/xzmlsLoJpyjoggmTEz8OWUFM0/RC5BsqQBDX2v5cMvDHcMakNTNrHIW2I5f" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
    <link href="/lib/css/pokedex.css" rel="stylesheet">
    <script src="/lib/js/navbar.js"></script>

</head>

<body>
    <br>
    <div class="container">
        <h3>Pokedex</h3>
        <br>
        <div class="card-deck">

            <?php
            foreach ($lis as $pokemon) {
                
                echo    '<div class="mb-4">'.
                                '<div class="card">'.
                                        '<a href="/pokedex/pokemon.php?id=' . $pokemon["id"] . '">'.
                                        '<div class="card-body">'.
                                            '<h5 class="card-title"> <span class="number">#'.$pokemon["id"].' </span>'
                                                . ucfirst($pokemon["nome"]) . '</h5>'.
                                            '<img src="/assets/pokemon/artwork/' . $pokemon["nome"] . '.png" alt="' . $pokemon["nome"] . '">'.
                                        '</div>'.
                                    '</a>'.
                                '</div>'.
                            '</div>';
            }


            ?>

        </div>
    </div>
    <br>
</body>

</html>