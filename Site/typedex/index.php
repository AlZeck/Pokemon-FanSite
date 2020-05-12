<!DOCTYPE html>
<html>
<?php
 include '../lib/php/dbcontroller.php';
 $con = DBController::getController();
 $lis = $con->getListTipi();
?>

<head>
    <title>Typedex-PokemonFan Site</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <script src="https://code.jquery.com/jquery-3.2.1.min.js" integrity="sha384-xBuQ/xzmlsLoJpyjoggmTEz8OWUFM0/RC5BsqQBDX2v5cMvDHcMakNTNrHIW2I5f" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
    <link href="/lib/css/tipi.css" rel="stylesheet">
    <link href="/lib/css/typedex.css" rel="stylesheet">
    <script src="/lib/js/navbar.js"></script>

</head>

<body>
    <br>

    <div class="container">
        <h3>Typedex</h3>
        <br>
        <div class="card-deck">

            <?php
            foreach ($lis as $tipo) {
                echo    '<div class="mb-4">'.
                            '<div class="card ' . $tipo['nome'] . ' card-type">'.
                                '<a href="/typedex/tipo.php?id=' . $tipo['nome'] . '">'.
                                    '<div class="card-body">'.
                                        '<h3 class="card-title">' . strtoupper($tipo['nome']) . '</h3>'.
                                        '<img src="/assets/img/typedex/'.$tipo['nome'] . '.png" alt="' . $tipo["nome"] . '">'.
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