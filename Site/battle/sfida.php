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
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <script src="https://code.jquery.com/jquery-3.2.1.min.js" integrity="sha384-xBuQ/xzmlsLoJpyjoggmTEz8OWUFM0/RC5BsqQBDX2v5cMvDHcMakNTNrHIW2I5f" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
    <script>
        function myFunction() {
            // Declare variables
            var input, filter, ul, li, a, i, txtValue;
            input = document.getElementById('myInput');
            filter = input.value.toUpperCase();
            ul = document.getElementById("trainerList");
            li = ul.getElementsByClassName('m-2');

            // Loop through all list items, and hide those who don't match the search query
            for (i = 0; i < li.length; i++) {
                a = li[i].getElementsByTagName("h5")[0];
                txtValue = a.textContent || a.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    li[i].style.display = "";
                } else {
                    li[i].style.display = "none";
                }
            }
        }
    </script>
    <style>
        html,
        body {
            height: 100%;
        }

        body {
            width: 100%;
            height: 100%;
            background-image: url(./stadium.png);
            background-size: cover;
            background-repeat: no-repeat;
            background-attachment: fixed;
            background-position: center;
            backdrop-filter: blur(20px) brightness(0.5);
        }


        ::-webkit-scrollbar {
            padding: 2px;
            width: 5px;
            background: transparent;
        }

        ::-webkit-scrollbar-track {
            /* -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 255, 1); */
            border-radius: 15px;
        }

        ::-webkit-scrollbar-thumb {
            /* border-radius: 15px;
            -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5); */
            background: rgba(255, 255, 255, 0.3);
            border-radius: 5px;
        }

        ::-webkit-scrollbar-thumb:hover {
            /* border-radius: 15px;
             -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5); */
            background: rgba(255, 255, 255, 0.5);
            border-radius: 5px;
        }

        .container {
            color: white;
            background-color: transparent;
        }

        .card-deck {
            flex-flow: row wrap;
            justify-content: center;
        }

        .card {
            background-color: rgba(255, 255, 255, 0.3);
            border-radius: 5px;
        }

        .cardtrn {
            text-align: center;
            height: 182px;
            width: 182px;
            justify-content: center;
        }

        .scroll {
            max-height: calc(100vh - 10rem);
            overflow-y: scroll;
        }

        .onbar {
            border-bottom: 1px solid rgba(255, 255, 255, .2);
            padding-top: 22px;
            padding-bottom: 22px;
        }

        .cardtrn:hover {
            background-color: rgba(255, 255, 255, 0.5);
        }
    </style>

    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script type="text/javascript" lang="javascript" src="/lib/js/defaultpkm.js"></script>
    <script type="text/javascript" lang="javascript" src="/lib/js/websockets/BCPUtils.js"></script>

</head>

<body>
    <div id="sfidaVue" class="container">
        <br>
        <!-- TODO ADD SFIDA UN ALLENATORE -->
        <div class="onbar">
            <input type="text" class="form-control" id="myInput" onkeyup="myFunction()" placeholder="Search for names..">
        </div>
        <div class="card-deck scroll" id="trainerList">

            <div class="m-2" v-for="u in utenti">
                <div class="card cardtrn" onclick="gesticiRichiesta(u.username)">
                    <div class="card-body">
                        <h5 class="card-title">{{u.username}}</h5>
                        <img v-bind:src="u.sprite" alt="sprite_allenatore">
                    </div>
                </div>
            </div>

        </div>
    </div>

    <script type="text/javascript" lang="javascript" src="/lib/js/sfida/sfidavue.js"></script>
</body>

</html>