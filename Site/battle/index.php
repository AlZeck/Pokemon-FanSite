<?php
if (!isset($_COOKIE['PHPSESSID']) || !isset($_COOKIE['user'])) {
	include "error.html";
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
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    <script src="https://code.jquery.com/jquery-3.2.1.min.js" integrity="sha384-xBuQ/xzmlsLoJpyjoggmTEz8OWUFM0/RC5BsqQBDX2v5cMvDHcMakNTNrHIW2I5f" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
    
	<link href="/lib/css/stat.css" rel="stylesheet">
	<link href="/lib/css/squadra.css" rel="stylesheet">
	<link href="/lib/css/tipi.css" rel="stylesheet">
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
	<style>
	</style>

	<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
	<script type="text/javascript" lang="javascript" src="/lib/js/battaglia/prendi_dal_db.js"></script>
	<script type="text/javascript" lang="javascript" src="/lib/js/battaglia/squadra_casuale.js"></script>
	<script type="text/javascript" lang="javascript" src="/lib/js/defaultpkm.js"></script>

</head>

<body>
	<div id="sceltaVue">

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
				<button type="button" class="btn btn-primary ml-4 mr.-2" v-on:click="casuale">CASUALE</button>
				<button type="button" class="btn btn-success ml-2 mr-2" v-on:click="conferma" :disabled="!squadraPronta">CONFERMA</button>
			</div>
		</nav>
		<div class="container-fluid">
			<div class="row" style="height:100%">

				<div class="col-lg-8">
					<div class="onbar">
						<input type="text" class="form-control" id="myInput" onkeyup="myFunction()" placeholder="Search for names..">
					</div>
					<div id="pokelist" class="card-deck scroll pb-4">

						<?php
						foreach ($lis as $pokemon) {

							echo    '<div class="mt-4">' .
								'<div class="card cardpkm" v-on:click="cambiaSelectedPkm(' . $pokemon["id"] . ')">' .
								'<div class="card-body">' .
								'<h5 class="card-title"> <span class="number">#' . $pokemon["id"] . ' </span>'
								. ucfirst($pokemon["nome"]) . '</h5>' .
								'<img src="/assets/pokemon/artwork_small/' . $pokemon["nome"] . '.png" alt="' . $pokemon["nome"] . '">' .
								'</div>' .
								'</div>' .
								'</div>';
						}
						?>

					</div>
				</div>

				<div class="col-lg-4 pokeinfo">
					<div id="selectedPkm">
						<div class="d-flex onbar">
							<div class="mr-auto">
								<h3> {{ selectedPkm.nome }} </h3>
							</div>

							<div class="btn-group mr-2">
								<div class="btn btn-tipo" v-bind:class="selectedPkm.tipo1"> {{ selectedPkm.tipo1.toUpperCase() }} </div>
								<div v-if="selectedPkm.tipo2 != null" class="btn btn-tipo" v-bind:class="selectedPkm.tipo2"> {{ selectedPkm.tipo2.toUpperCase() }} </div>
							</div>
							<div class="divider-left">
								<button v-if="!squadra.includes(selectedPkm)" type="button" class="btn btn-tipo ml-2 btn-success" :disabled="squadra.length >= 7 || (selectedPkm.uber && quantiUber==2)" v-on:click="aggiungiPkm">AGGIUNGI</button>
								<button v-else type="button" class="btn btn-tipo ml-2 btn-danger" :disabled="selectedPkm.id == 0" v-on:click="rimuoviPkm">RIMUOVI</button>
							</div>
						</div>
						<div class="scroll">
							<br>
							<div class="media">
								<img class="align-self-center mr-3" v-bind:src="selectedPkm.artwork" alt="artwork">

								<div class="media-body">
									<div class="card">
										<div class="card-body card-stat">
											<div class="row">
												<div class="col-sm-2 stat-label">PS</div>
												<div class="col">
													<div class="progress justify-content-between">
														<div class="progress-bar bar-stat-ps" role="progressbar" v-bind:aria-valuenow="selectedPkm.ps" aria-valuemin="0" v-bind:aria-valuemax="270" :style="{ width: selectedPkm.ps/270*100 + '%'} ">
															{{selectedPkm.ps}} </div>
													</div>
												</div>
											</div>
											<div class="row">
												<div class="col-sm-2 stat-label">ATT</div>
												<div class="col">
													<div class="progress justify-content-between">
														<div class="progress-bar bar-stat-att" role="progressbar" v-bind:aria-valuenow="selectedPkm.att" aria-valuemin="0" v-bind:aria-valuemax="270" :style="{ width: selectedPkm.att/270*100 + '%' }">
															{{selectedPkm.att}} </div>
													</div>
												</div>
											</div>
											<div class="row">
												<div class="col-sm-2 stat-label">DIF</div>
												<div class="col">
													<div class="progress justify-content-between">
														<div class="progress-bar bar-stat-dif" role="progressbar" v-bind:aria-valuenow="selectedPkm.dif" aria-valuemin="0" v-bind:aria-valuemax="270" :style="{ width: selectedPkm.dif/270*100 + '%' }">
															{{selectedPkm.dif}} </div>
													</div>
												</div>
											</div>
											<div class="row">
												<div class="col-sm-2 stat-label">ATTS</div>
												<div class="col">
													<div class="progress justify-content-between">
														<div class="progress-bar bar-stat-attsp" role="progressbar" v-bind:aria-valuenow="selectedPkm.atts" aria-valuemin="0" v-bind:aria-valuemax="270" :style="{ width: selectedPkm.atts/270*100 + '%' }">
															{{selectedPkm.atts}} </div>
													</div>
												</div>
											</div>
											<div class="row">
												<div class="col-sm-2 stat-label">DIFS</div>
												<div class="col">
													<div class="progress justify-content-between">
														<div class="progress-bar bar-stat-difsp" role="progressbar" v-bind:aria-valuenow="selectedPkm.difs" aria-valuemin="0" v-bind:aria-valuemax="270" :style="{ width: selectedPkm.difs/270*100 + '%' }">
															{{selectedPkm.difs}} </div>
													</div>
												</div>
											</div>
											<div class="row">
												<div class="col-sm-2 stat-label">VEL</div>
												<div class="col">
													<div class="progress justify-content-between">
														<div class="progress-bar bar-stat-vel" role="progressbar" v-bind:aria-valuenow="selectedPkm.vel" aria-valuemin="0" v-bind:aria-valuemax="270" :style="{ width: selectedPkm.vel/270*100 + '%' }">
															{{selectedPkm.vel}} </div>
													</div>
												</div>
											</div>
											<hr>
											<div class="row">
												<div class="col-sm-2 stat-label">UBER</div>
												<div class="col">
													<div class="btn uber-btn" v-bind:class=" (selectedPkm.uber)? 'btn-success' : 'btn-danger'">
														{{ selectedPkm.uber.toString().toUpperCase() }}
													</div>

												</div>
											</div>

										</div>
									</div>
								</div>
							</div>

							<br>

							<div class="card-columns">
								<button type="button" class="card card-mossa" v-for="(m,i) in selectedPkm.mosse" v-bind:value="m.id" v-bind:class="m.tipo" v-on:dblclick="rimuoviMossa(i)">
									<div class="card-body">
										<h3 class="card-title text-center">{{ m.nome.toUpperCase() }} </h3>
										<div class="d-flex justify-content-between">
											<div>{{ m.tipo.toUpperCase() }}</div>
											<div>{{ m.categoria.toUpperCase() }}</div>
										</div>
										<div class="d-flex justify-content-between">
											<div>PT: {{ m.potenza }} </div>
											<div>PR: {{ m.precisione }}</div>
										</div>
									</div>
								</button>
							</div>

							<hr>



							<div class="d-flex justify-content-center flex-wrap">
								<button v-for="m in tutteMosse" class="btn btn-mossa m-2" v-bind:class="m.tipo" v-bind:value="m.id" v-on:click="aggiungiMossa(m)" 
								:disabled="selectedPkm.mosse.length == 4" v-show="!selectedPkm.mosse.includes(m)">
									{{m.nome}}
								</button>
							</div>
							<br>




						</div>
					</div>
				</div>
			</div>
		</div>


	</div>


</body>
<script type="text/javascript" lang="javascript" src="/lib/js/scelta_squadra/sceltavue.js"></script>

</html>