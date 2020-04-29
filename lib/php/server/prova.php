<html>
<head>
</head>
<body>

<?php
	//PROGRAMMA PER TESTARE FUNZIONAMENTO GENERALE, LASCIARE QUESTO FILE FINO A NUOVO ORDINE
	
	include './dbcontroller.php';
	include './utilities.php';
	include './pokemon.php';
	include './mossa.php';
	include './utente.php';
	include './battaglia.php';


	$J1 = '{
		"utente": "Red",

		"squadra": [
			{
				"id": 1,

				"mosse": [
					28,
					19,
					31,
					56
				]
			},

			{
				"id": 649,

				"mosse": [
					328,
					312,
					68,
					126
				]
			},

			{
				"id": 122,

				"mosse": [
					184,
					66,
					3,
					46
				]
			},

			{
				"id": 250,

				"mosse": [
					163,
					14,
					220,
					170
				]
			},

			{
				"id": 550,

				"mosse": [
					32,
					28,
					41,
					139
				]
			},

			{
				"id": 55,

				"mosse": [
					253,
					10,
					41,
					66
				]
			}
		]
	}';

	$J2 = '{
		"utente": "Blue",

		"squadra": [
			{
				"id": 1,

				"mosse": [
					28,
					19,
					31,
					56
				]
			},

			{
				"id": 649,

				"mosse": [
					328,
					312,
					68,
					126
				]
			},

			{
				"id": 122,

				"mosse": [
					184,
					66,
					3,
					46
				]
			},

			{
				"id": 250,

				"mosse": [
					163,
					14,
					220,
					170
				]
			},

			{
				"id": 550,

				"mosse": [
					32,
					28,
					41,
					139
				]
			},

			{
				"id": 55,

				"mosse": [
					253,
					10,
					41,
					66
				]
			}
		]
	}';
	
	
	/*	TEST 1
	$dbcon = DBController::getController();

	$pkm1 = $dbcon->getPokemonById(250);
	$mossa1 = $dbcon->getMossaById(250);

	echo "<BR/> <BR/> <BR/>" . $pkm1[0] . " +++ " . $pkm1[1] . " +++ " . $pkm1[2] . " +++ " . $pkm1[3] . " +++ " . $pkm1[4]
	. " +++ " . $pkm1[5] . " +++ " . $pkm1[6] . " +++ " . $pkm1[7] . " +++ " . $pkm1[8] . " +++ " . $pkm1[9] . " +++ " . $pkm1[10];
	
	echo "<BR/> <BR/> <BR/>";

	echo $mossa1[0] . " +++ " . $mossa1[1] . " +++ " . $mossa1[2] . " +++ " . $mossa1[3] . " +++ " . $mossa1[4]
	. " +++ " . $mossa1[5] . " +++ " . $mossa1[6];
	*/
	

	/*	TEST 2
	$mossa1 = new Mossa(1, "azione", "normale", "fisico", 40, 100);
	$mossa2 = new Mossa(2, "botta", "normale", "fisico", 40, 100);
	$mossa3 = new Mossa(3, "vorticerba", "erba", "speciale", 65, 90);
	$mossa4 = new Mossa(4, "colpokarate", "lotta", "fisico", 50, 100);

	$pkm1 = new Pokemon(1, "pikachu", "elettro", null, 35, 55, 40, 50, 50, 90, $mossa1, $mossa2, $mossa3, $mossa4);
	$pkm2 = new Pokemon(2, "eevee", "normale", null, 55, 55, 50, 45, 65, 55, $mossa1, $mossa2, $mossa3, $mossa4);

	echo "<BR/> <BR/> <BR/>" . strval($pkm1);
	echo "<BR/><BR/><BR/>";
	echo strval($pkm2);
	
	[$a, $b] = $pkm1->calcoloDanno($mossa1, $pkm2);
	echo "$a --- $b";
	*/


	/*	TEST 3
	function ritornaMossa($mossa_id, $db) {
		$mossa = $db->getMossaById($mossa_id);
		return new Mossa($mossa_id, $mossa[1], $mossa[2], $mossa[3], (int)$mossa[4], (int)$mossa[5]);
	}

	function ritornaPokemon($pokemon_id, $mossa1, $mossa2, $mossa3, $mossa4, $db) {
		$pkm = $db->getPokemonById($pokemon_id);
		return new Pokemon($pokemon_id, $pkm[1], $pkm[2], $pkm[3], (int)$pkm[4], (int)$pkm[5], (int)$pkm[6], (int)$pkm[7], (int)$pkm[8], (int)$pkm[9], $mossa1, $mossa2, $mossa3, $mossa4);
	}

	$dbcon = DBController::getController();

	$obj_init = json_decode($J1);

	$arraySquadra = array();

	$squadra = $obj_init->squadra;
	for($i=0; $i<6; $i++) {
		$arraySquadra[$i] = ritornaPokemon(
			$squadra[$i]->id,
			ritornaMossa( $squadra[$i]->mosse[0], $dbcon ),
			ritornaMossa( $squadra[$i]->mosse[1], $dbcon ),
			ritornaMossa( $squadra[$i]->mosse[2], $dbcon ),
			ritornaMossa( $squadra[$i]->mosse[3], $dbcon ),
			$dbcon
		);
	}

	$U = new Utente(
		$obj_init->utente,
		$arraySquadra[0],
		$arraySquadra[1],
		$arraySquadra[2],
		$arraySquadra[3],
		$arraySquadra[4],
		$arraySquadra[5]
	);

	echo "<BR/> <BR/> <BR/>" . strval($U);
	*/


	/*	TEST 4
	[$bat, $mess] = inizializzaBattaglia($J1, $J2);
	echo "<BR/> <BR/> <BR/>" . strval($bat->getUtente1());
	echo strval($bat->getUtente2());
	echo "$mess";
	*/


?>

</body>