<!DOCTYPE html>
<html>
<?php 
    include 'lib/php/dbcontroller.php';
    $con = DBController::getController();
    $lis = $con->getPokemonList();
?>
<head>
    <title>Pokedex-PokemonFan Site</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
        integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
        integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN"
        crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"
        integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q"
        crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"
        integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl"
        crossorigin="anonymous"></script>
    <link href="lib/css/homepage.css" rel="stylesheet">
    <script src="lib/js/navbar.js"></script>

</head>
<body>
    <br>
    <div class="container" style="max-width: 1500px;">
        <h3>Dai un'occhiata ai mostri pokemon</h3>
        <div class="row row-cols-1 row-cols-md-6">
            
            <?php
                foreach ($lis as $pokemon) {
                    echo    '<div class="col mb-4">
                                <div class="card" style=" height: 180px; width: 160px;">
                                    <a href="#">
                                    <div class="card-body" style="align: center" >
                                    <h5 class="card-title">'.$pokemon["nome"].'</h5>
                                    <img src="assets/pokemon/artwork/'.$pokemon["nome"].'.png" class="card-img-top" alt="'.$pokemon["nome"].'">
                                    </div>
                                    </a>
                                </div>
                            </div>';
                }

                
            ?>
            
        </div>
    </div>

</body>
</html>