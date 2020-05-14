<?php
if (!isset($_COOKIE['PHPSESSID']) || !isset($_COOKIE['user'])) {
	echo "No session started";
	die();
}
session_start();
$user = $_COOKIE['user'];


$team = ["mudkip", "charmander", "genesect", "giratina"];


include '../lib/php/dbcontroller.php';
$con = DBController::getController();
$lis = $con->getPokemonList();

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
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>

	<link href="/lib/css/stat.css" rel="stylesheet">
	<link href="/lib/css/tipi.css" rel="stylesheet">
	<link href="/lib/css/squadra.css" rel="stylesheet">
	<script>
		function myFunction() {
			// Declare variables
			var input, filter, ul, li, a, i, txtValue;
			input = document.getElementById('myInput');
			filter = input.value.toUpperCase();
			ul = document.getElementById("pokelist");
			li = ul.getElementsByClassName('mt-4');

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
</head>

<body>
	<nav class="navbar sticky-top navbar-expand-sm navbar-dark pokenavbar">
		<div class="navbar-nav mr-auto border-right">
			<button type="button" class="btn btn-danger mr-4 ml-2">Exit</button>
		</div>
		<div class="navbar-nav mx-auto">
			<div class="nav-link active btn pokebtn"> <img src="/assets/pokemon/mini_sprite/<?php echo $team[0]; ?>.png"><?php echo $team[0]; ?> </div>
			<div class="nav-link active btn pokebtn"> <img src="/assets/pokemon/mini_sprite/<?php echo $team[1]; ?>.png"><?php echo $team[1]; ?> </div>
			<div class="nav-link active btn pokebtn"> <img src="/assets/pokemon/mini_sprite/<?php echo $team[2]; ?>.png"><?php echo $team[2]; ?> </div>
			<div class="nav-link active btn pokebtn"> <img src="/assets/pokemon/mini_sprite/<?php echo $team[3]; ?>.png"><?php echo $team[3]; ?> </div>
			<div class="nav-link active btn pokebtn"> </div>
			<div class="nav-link active btn pokebtn"> </div>
		</div>
		<div class="navbar-nav ml-auto border-left">
			<button type="button" class="btn btn-primary ml-4 mr-2">Random</button>
			<button type="button" class="btn btn-success ml-2 mr-2">Conferma</button>
		</div>
	</nav>
	<div class="container-fluid">
		<div class="row" style="height:100%">

			<div class="col-lg-8">
				<br>
				<input type="text" class="form-control" id="myInput" onkeyup="myFunction()" placeholder="Search for names..">
				<br>
				<div id="pokelist" class="card-deck scroll pb-4">

					<?php
					foreach ($lis as $pokemon) {

						echo    '<div class="mt-4">' .
							'<div class="card">' .
							'<div class="card-body">' .
							'<h5 class="card-title"> <span class="number">#' . $pokemon["id"] . ' </span>'
							. ucfirst($pokemon["nome"]) . '</h5>' .
							'<img src="/assets/pokemon/artwork/' . $pokemon["nome"] . '.png" alt="' . $pokemon["nome"] . '">' .
							'</div>' .
							'</div>' .
							'</div>';
					}


					?>

				</div>
			</div>
			<div class="col-lg-4 pokeinfo">

				<br>
				<?php $pokemon = $lis[257]; ?>
				<div class="btn-toolbar justify-content-between" role="toolbar">
					<div role="group">
						<h3> <?php echo ucfirst($pokemon["nome"]); ?> </h3>
					</div>

					<div class="btn-group" role="group">
						<?php
						echo '<a class="btn btn-tipo ' . $pokemon['tipo1'] . '"' .
							'href="/typedex/tipo.php?id=' . $pokemon['tipo1'] . '">'
							. strtoupper($pokemon['tipo1']) . '</a>';

						if ($pokemon['tipo2'] !== NULL) {
							echo '<a class="btn btn-tipo ' . $pokemon['tipo2'] . '"' .
								'href="/typedex/tipo.php?id=' . $pokemon['tipo2'] . '">'
								. strtoupper($pokemon['tipo2']) . '</a>';
						}
						?>
					</div>
				</div>
				<br>
				<div class="card">
					<div class="card-body card-stat">
						<h3 class="card-title"> Statistiche </h3>
						<?php
						$stats = ["ps", "att", "dif", "attsp", "difsp", "vel"];

						foreach ($stats as $stat) {
							$val = $pokemon[$stat];
							$per = ((int) $val) * 100 / 270;
							echo ' <div class="row"><div class="col-sm-2 stat-label">' . strtoupper($stat) . '</div><div class="col">';
							echo '<div class="progress justify-content-between"> ' .
								'<div class="progress-bar bar-stat-' . $stat . '" role="progressbar" aria-valuenow="' . $per .
								'" aria-valuemin="0" aria-valuemax="270" style="width:' . $per . '%;">' . $val . '</div></div></div></div>';
							if ($stat != "vel") echo '<br>';
						}

						?>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- <div class="container">
		<h1 class="display-4">Ciao, Pokefan!</h1>
		<p class="lead"> Purtroppo il nostro simulatore di battaglia non è un ancora disponibile,
			siamo un gruppo di studenti amanti a i pokemon e lavoriamo quanto possibile per avere tutto funzionante il prima possibile.</p>
		<hr class="my-4">
		<p>Ti invitiamo a tornare indietro e continuare vedere il resto del nostro sito :).</p>
		<p class="lead">
			<a class="btn btn-primary btn-lg" href="/" role="button">Go Back</a>
		</p>
	</div> -->

</body>