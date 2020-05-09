<!DOCTYPE html>
<html>
<?php 
    $lis = ['normale', 'fuoco', 'lotta', 'acqua', 'volante', 'erba', 'veleno',
            'elettro', 'terra', 'psico', 'roccia', 'ghiaccio', 'coleottero', 
            'drago', 'spettro', 'buio', 'acciaio', 'folletto'];
?>
<head>
    <title>Typedex-PokemonFan Site</title>
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
    <link href="/lib/css/typedex.css" rel="stylesheet">
    <link href="/lib/css/tipi.css" rel="stylesheet">
    <script src="/lib/js/navbar.js"></script>
    
</head>
<body>
    <br>

    <div class="container">
        <h3>Dai un'occhiata ai tipi di pokemon</h3>
        <br>
        <div class="card-deck">
            
            <?php
                foreach ($lis as $tipo) {
                    echo    '<div class="mb-4">
                                <div class="card '.$tipo.'">
                                    <a href="/typedex/tipo.php?id='.$tipo.'">
                                    <div class="card-body">
                                    <h5 class="card-title">'.strtoupper($tipo).'</h5>
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