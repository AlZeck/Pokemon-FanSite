<?php
	if (!isset($_COOKIE['PHPSESSID']) || !isset($_COOKIE['user'])) {
		include "index.html";
		die();
	}
	session_start();
	$user = $_COOKIE['user'];

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

	<script src="https://code.jquery.com/jquery-3.2.1.min.js" integrity="sha384-xBuQ/xzmlsLoJpyjoggmTEz8OWUFM0/RC5BsqQBDX2v5cMvDHcMakNTNrHIW2I5f" crossorigin="anonymous"></script>
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

	<script type="text/javascript" lang="javascript" src="/lib/js/battaglia/vue.min.js"></script>
	<script type="text/javascript" lang="javascript" src="/lib/js/battaglia/prendi_dal_db.js"></script>
	<script type="text/javascript" lang="javascript" src="/lib/js/battaglia/squadra_casuale.js"></script>
    <script type="text/javascript" lang="javascript" src="/lib/js/scelta_squadra/sceltavue.js"></script>
</head>

<body>
<span id="sceltaVue">

	<nav class="navbar sticky-top navbar-expand-sm navbar-dark pokenavbar">
		<div class="navbar-nav mr-auto border-right">
			<button type="button" class="btn btn-danger mr-4 ml-2" onclick="return window.location.assign('/')">ESCI</button>
		</div>
		<div class="navbar-nav mx-auto">
			<div class="nav-link active btn pokebtn" v-on:click="cambiaSelectedPkmSquadra(1)"> <img v-bind:src="primoPkm.mini_sprite" alt="mini-sprite"> {{ primoPkm.nome }} </div>
			<div class="nav-link active btn pokebtn" v-on:click="cambiaSelectedPkmSquadra(2)"> <img v-bind:src="secondoPkm.mini_sprite" alt="mini-sprite"> {{ secondoPkm.nome }} </div>
			<div class="nav-link active btn pokebtn" v-on:click="cambiaSelectedPkmSquadra(3)"> <img v-bind:src="terzoPkm.mini_sprite" alt="mini-sprite"> {{ terzoPkm.nome }} </div>
			<div class="nav-link active btn pokebtn" v-on:click="cambiaSelectedPkmSquadra(4)"> <img v-bind:src="quartoPkm.mini_sprite" alt="mini-sprite"> {{ quartoPkm.nome }} </div>
			<div class="nav-link active btn pokebtn" v-on:click="cambiaSelectedPkmSquadra(5)"> <img v-bind:src="quintoPkm.mini_sprite" alt="mini-sprite"> {{ quintoPkm.nome }} </div>
			<div class="nav-link active btn pokebtn" v-on:click="cambiaSelectedPkmSquadra(6)"> <img v-bind:src="sestoPkm.mini_sprite" alt="mini-sprite"> {{ sestoPkm.nome }} </div>
		</div>
		<div class="navbar-nav ml-auto border-left">
			<button type="button" class="btn btn-primary ml-4 mr-2" v-on:click="casuale">CASUALE</button>
			<button type="button" class="btn btn-success ml-2 mr-2" v-on:click="conferma">CONFERMA</button>
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
								'<div class="card" value="' . $pokemon["id"] . '" v-on:click="vediPkm">' .
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

			<div id="selectedPkm" class="col-lg-4 scroll pokeinfo">
				<div class="btn-toolbar justify-content-between" role="toolbar">
					<div role="group">
						<img v-bind:src="selectedPkm.artwork" alt="artwork">
					</div>

					<div role="group">
						<h3> {{ selectedPkm.nome }} </h3>

						<br>

						<div class="btn-group">
							<span class="btn btn-tipo" v-bind:class="selectedPkm.tipo1"> {{ selectedPkm.tipo1 }} </span>
							<span v-if="selectedPkm.tipo2 != null" class="btn btn-tipo" v-bind:class="selectedPkm.tipo2"> {{ selectedPkm.tipo2 }} </span>
						</div>

						<br>

						{{ selectedPkm.uber }}

						<br>

						<div class="card">
							<div class="card-body card-stat">
								<div class="row">
									<div class="col-sm-2 stat-label">PS</div>
									<div class="col">
										<div class="progress justify-content-between">
											<div class="progress-bar bar-stat-ps" role="progressbar"
												v-bind:aria-valuenow="selectedPkm.ps" aria-valuemin="0"
												v-bind:aria-valuemax="270"
												:style="{ width: selectedPkm.ps/270*100 + '%'} ">
												{{selectedPkm.ps}} </div>
										</div>
									</div>
								</div>
								<div class="row">
									<div class="col-sm-2 stat-label">ATT</div>
									<div class="col">
										<div class="progress justify-content-between">
											<div class="progress-bar bar-stat-att" role="progressbar"
												v-bind:aria-valuenow="selectedPkm.att" aria-valuemin="0"
												v-bind:aria-valuemax="270"
												:style="{ width: selectedPkm.att/270*100 + '%' }">
												{{selectedPkm.att}} </div>
										</div>
									</div>
								</div>
								<div class="row">
									<div class="col-sm-2 stat-label">DIF</div>
									<div class="col">
										<div class="progress justify-content-between">
											<div class="progress-bar bar-stat-dif" role="progressbar"
												v-bind:aria-valuenow="selectedPkm.dif" aria-valuemin="0"
												v-bind:aria-valuemax="270"
												:style="{ width: selectedPkm.dif/270*100 + '%' }">
												{{selectedPkm.dif}} </div>
										</div>
									</div>
								</div>
								<div class="row">
									<div class="col-sm-2 stat-label">ATTS</div>
									<div class="col">
										<div class="progress justify-content-between">
											<div class="progress-bar bar-stat-attsp" role="progressbar"
												v-bind:aria-valuenow="selectedPkm.atts" aria-valuemin="0"
												v-bind:aria-valuemax="270"
												:style="{ width: selectedPkm.atts/270*100 + '%' }">
												{{selectedPkm.atts}} </div>
										</div>
									</div>
								</div>
								<div class="row">
									<div class="col-sm-2 stat-label">DIFS</div>
									<div class="col">
										<div class="progress justify-content-between">
											<div class="progress-bar bar-stat-difsp" role="progressbar"
												v-bind:aria-valuenow="selectedPkm.difs" aria-valuemin="0"
												v-bind:aria-valuemax="270"
												:style="{ width: selectedPkm.difs/270*100 + '%' }">
												{{selectedPkm.difs}} </div>
										</div>
									</div>
								</div>
								<div class="row">
									<div class="col-sm-2 stat-label">VEL</div>
									<div class="col">
										<div class="progress justify-content-between">
											<div class="progress-bar bar-stat-vel" role="progressbar"
												v-bind:aria-valuenow="selectedPkm.vel" aria-valuemin="0"
												v-bind:aria-valuemax="270"
												:style="{ width: selectedPkm.vel/270*100 + '%' }">
												{{selectedPkm.vel}} </div>
										</div>
									</div>

								</div>
							</div>
						</div>
					</div>
				</div>

				<br>

				<!-- FARE CHE SE UNA MOSSA ANCORA NON PRESA C'È UN RIQUADRO DI DEFAULT -->
				<button class="card card-body" v-for="m in selectedPkm.mosse" v-bind:value="m.id" v-bind:class="m.tipo">
					<h5 class="card-title">{{ m.nome }} </h5>
					{{ m.tipo.toUpperCase() }} {{ m.categoria.toUpperCase() }} <br>
					{{ m.potenza }} - {{ m.precisione }}
                </button>

				<br>

				<!-- QUI METTERE LISTA MOSSE DISPONIBILI -->
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

</span>
</body>