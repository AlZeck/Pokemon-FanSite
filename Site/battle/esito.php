<!DOCTYPE html>
<html>

<head>
    <title>Esito-PokemonFan Site</title>
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
    <link href="/lib/css/esito.css" rel="stylesheet">
    <script src="/lib/js/navbar.js"></script>

</head>

<body>
    <br>
    <div class="container">
        <?php 
            if($_GET['risultato']=='vittoria')
                echo '<img src="/assets/img/risultato/winning.png" class="d-block w-100" alt="vittoria">
                    <h3>CONGRATULAZIONI HAI VINTO LA BATTAGLIA!</h3>';

            else
                echo '<img src="/assets/img/risultato/losing.png" class="d-block w-100" alt="sconfitta">
                    <h3>PURTROPPO HAI PERSO LA BATTAGLIA!</h3>'
        ?>

        <a class="btn btn-primary btn-lg" href="" role="button">RIVINCITA</a>

        <a class="btn btn-primary btn-lg" href="" role="button">CAMBIA AVVERSARIO</a>

        <a class="btn btn-primary btn-lg" href="" role="button">CAMBIA SQUADRA</a>



</body>

</html>