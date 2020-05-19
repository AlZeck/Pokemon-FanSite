<?php
if (!isset($_COOKIE['PHPSESSID']) || !isset($_COOKIE['user'])) {
    include "../lib/html/errorNotLoggedIn.html";
    die();
}
session_start();
$user = $_COOKIE['user'];
?>
<!DOCTYPE html>
<html>

<head>
    <title>Battle-PokemonFan Site</title>
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
    <script>
        var user = <?php echo '"' . $_COOKIE["user"] . '"';  ?>;
    </script>
    <link rel="stylesheet" href="/lib/css/scelta.css">

    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.11"></script>

    <script type="text/javascript" lang="javascript" src="/lib/js/search.js"></script>
    <script type="text/javascript" lang="javascript" src="/lib/js/websockets/modalComms.js"></script>
    <script type="text/javascript" lang="javascript" src="/lib/js/battle/defaultpkm.js"></script>
    <script type="text/javascript" lang="javascript" src="/lib/js/battle/prendi_dal_db.js"></script>
    <script type="text/javascript" lang="javascript" src="/lib/js/battle/squadra_casuale.js"></script>
    <script type="text/javascript" lang="javascript" src="/lib/js/battle/cpu.js"></script>
    <script type="text/javascript" lang="javascript" src="/lib/js/battle/battaglia.js"></script>
    <script type="text/javascript" lang="javascript" src="/lib/js/websockets/BCPController.js"></script>
    <script type="text/javascript" lang="javascript" src="/lib/js/websockets/BCPUtils.js"></script>
    <script src="/lib/js/navbarUtils.js"></script>
    <!-- <script type="text/javascript" lang="javascript" src="/lib/js/websockets/BCPUtils.js"></script> -->
    <!-- messagistica -->



</head>

<body>
    <div class="modal fade" id="modalComms" tabindex="-1" role="dialog" aria-labelledby="modalComms" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modalTitle">TITOLO</h5>
                </div>
                <div id="modalMsg" class="modal-body">

                </div>
                <div class="modal-footer">
                    <button id="modalCancel" type="button" class="btn btn-danger">Cancel</button>
                    <button id="modalAccept" type="button" class="btn btn-success">Accept</button>
                </div>
            </div>
        </div>
    </div>
    <br>
    <div class="d-flex">
        <div class="mr-auto">
            <a class="ml-3" href="/"> <img src="/assets/img/navbar/logo-mini.png" height="50" alt=""></a>
        </div>
        <div class="mx-auto">
            <h3 class="text-light"> Scegli un allenatore da sfidare! </h3>
        </div>
        <div class="ml-auto">
            <div style="padding-right:134.16px"></div>
        </div>

    </div>


    <div id="sfidaVue" class="container">
        <div class="onbar">
            <input type="text" class="form-control" id="searchbar" onkeyup="search('searchbar', 'trainerList', 'cardtrn', 'h5')" placeholder="Cerca tramite username">
        </div>
        <div class="card-deck scroll pb-4" id="trainerList">

            <div class="mt-4" v-for="u in utenti">
                <div class="card cardtrn" v-on:click="mandaRichiesta(u.username)">
                    <div class="card-body">
                        <h5 class="card-title">{{u.username}}</h5>
                        <img v-bind:src="u.sprite" alt="sprite_allenatore">
                    </div>
                </div>
            </div>

        </div>
    </div>
    <script type="text/javascript" lang="javascript" src="/lib/js/battle/sfidavue.js"></script>
</body>

</html>