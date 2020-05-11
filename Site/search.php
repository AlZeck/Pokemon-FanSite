<!DOCTYPE html>
<html>
<head>
    <title>PokemonFan Site</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <script src="https://code.jquery.com/jquery-3.2.1.min.js" integrity="sha384-xBuQ/xzmlsLoJpyjoggmTEz8OWUFM0/RC5BsqQBDX2v5cMvDHcMakNTNrHIW2I5f" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
    <link href="/lib/css/search.css" rel="stylesheet">
    <link href="/lib/css/tipi.css" rel="stylesheet">
    <script src="/lib/js/navbar.js"></script>
</head>

<?php
include 'lib/php/dbcontroller.php';
$con = DBController::getController();
$lis = $con->searchByName($_GET['s']);
if($lis==NULL){
    include("./lib/php/notFound.php");
    sendError($_GET['s']." not found");
    die();
}
?>

<body>
    <br>
    <div class="container" >
        <div class="card-deck">
            <?php
            foreach ($lis as $item) {
                if($item['tab']=='1'){
                    echo    '<div class="mb-4">'.
                                    '<div class="card">'.
                                            '<a href="/pokedex/pokemon.php?id=' . $item["id"] . '">'.
                                            '<div class="card-body">'.
                                                '<h5 class="card-title"> <span class="number">#'.$item["id"].'</span>'
                                                    . ucfirst($item["nome"]) . '</h5>'.
                                                '<img src="/assets/pokemon/artwork/' . $item["nome"] . '.png" alt="' . $item["nome"] . '">'.
                                            '</div>'.
                                        '</a>'.
                                    '</div>'.
                                '</div>';
                }
                elseif($item['tab']=='2'){
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
                            '<div class="card card-tipo ' . $item['nome'] . '">'.
                                '<a href="/typedex/tipo.php?id=' . $item['nome'] . '">'.
                                    '<div class="card-body">'.
                                        '<h3 class="card-title">' . strtoupper($item['nome']) . '</h3>'.
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