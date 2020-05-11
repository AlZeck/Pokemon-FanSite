<!DOCTYPE html>
<html>
<?php
include '../lib/php/dbcontroller.php';
$con = DBController::getController();
$lis = $con->getMosseList();


?>

<head>
    <title>Movedex-PokemonFan Site</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <script src="https://code.jquery.com/jquery-3.2.1.min.js" integrity="sha384-xBuQ/xzmlsLoJpyjoggmTEz8OWUFM0/RC5BsqQBDX2v5cMvDHcMakNTNrHIW2I5f" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
    <link href="/lib/css/movedex.css" rel="stylesheet">
    <script src="/lib/js/navbar.js"></script>

</head>

<body>
    <br>
    <div class="container">
        <h3>Dai un'occhiata alle varie mosse dei Pokemon</h3>
        <br>
        <div class="card-deck">

            <?php
            foreach ($lis as $mossa) {

                echo    '<div class="mb-4">'.
                            '<div class="card">'.
                                '<a href="/movedex/mossa.php?id=' . $mossa["id"] . '">'.
                                    '<div class="card-body">'.
                                        '<h5 class="card-title">' . ucfirst($mossa["nome"]) . '</h5>'.
                                        '<img src="/assets/img/mosse/' . $mossa["tipo"] . '.png" alt="' . $mossa["nome"] . '">'.
                                    '</div>'.
                                '</a>'.
                            '</div>'.
                        '</div>';
            }


            ?>

        </div>
    </div>

</body>

</html>