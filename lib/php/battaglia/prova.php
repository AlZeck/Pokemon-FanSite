<html>
<head>
</head>
<body>

<?php
	//PROGRAMMA PER TESTARE FUNZIONAMENTO GENERALE, LASCIARE QUESTO FILE FINO A NUOVO ORDINE
	
	include '../dbcontroller.php';
	include './utilities.php';
	include './pokemon.php';
	include './mossa.php';
	include './utente.php';
	include './battaglia.php';


	$J1 = '{
		"utente": "Red",

		"squadra": [
			{
				"id": 292,
		
				"mosse": [
					10,
					86,
					92,
					230
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
				"id": 1,

				"mosse": [
					28,
					19,
					31,
					56
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
				"id": 292,
		
				"mosse": [
					10,
					86,
					92,
					230
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
				"id": 292,
		
				"mosse": [
					10,
					86,
					92,
					230
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

	$A1 = '{
		"utente": "Red",
		"azione": "mossa",
		"valore": 10
	}';

	$A2 = '{
		"utente": "Blue",
		"azione": "mossa",
		"valore": 10
	}';

	$B1 = '{
		"utente": "Red",
		"azione": "switch",
		"valore": 649
	}';

	$B2 = '{
		"utente": "Blue",
		"azione": "attesa",
		"valore": 649
	}';

	$C1 = '{
		"utente": "Red",
		"azione": "forfeit",
		"valore": 0
	}';

	$C2 = '{
		"utente": "Blue",
		"azione": "forfeit",
		"valore": 0
	}';

	$D1 = '{
		"utente": "Red",
		"azione": "attesa",
		"valore": 0
	}';

	$D2 = '{
		"utente": "Blue",
		"azione": "attesa",
		"valore": 0
	}';


	/*	//TEST 1 --- test funzionamento interfaccia col database
		$dbcon = DBController::getController();

		$pkm1 = $dbcon->getPokemonById(250);
		$mossa1 = $dbcon->getMossaById(250);

		echo "<BR/> <BR/> <BR/>" . $pkm1[0] . " +++ " . $pkm1[1] . " +++ " . $pkm1[2] . " +++ " . $pkm1[3] . " +++ " . $pkm1[4]
		. " +++ " . $pkm1[5] . " +++ " . $pkm1[6] . " +++ " . $pkm1[7] . " +++ " . $pkm1[8] . " +++ " . $pkm1[9] . " +++ " . $pkm1[10];
		
		echo "<BR/> <BR/> <BR/>";

		echo $mossa1[0] . " +++ " . $mossa1[1] . " +++ " . $mossa1[2] . " +++ " . $mossa1[3] . " +++ " . $mossa1[4]
		. " +++ " . $mossa1[5] . " +++ " . $mossa1[6];
	*/
	

	/*	//TEST 2 --- test funzionamento creazione mosse e pokemon e calcolo danno
		$mossa1 = new Mossa(1, "azione", "normale", "fisico", 40, 100);
		$mossa2 = new Mossa(2, "botta", "normale", "fisico", 40, 100);
		$mossa3 = new Mossa(3, "vorticerba", "erba", "speciale", 65, 90);
		$mossa4 = new Mossa(4, "colpokarate", "lotta", "fisico", 50, 100);

		$pkm1 = new Pokemon(1, "pikachu", "elettro", null, 35, 55, 40, 50, 50, 90, $mossa1, $mossa2, $mossa3, $mossa4);
		$pkm2 = new Pokemon(2, "eevee", "normale", null, 55, 55, 50, 45, 65, 55, $mossa1, $mossa2, $mossa3, $mossa4);

		echo strval($pkm1);
		echo "<BR/><BR/><BR/>";
		echo strval($pkm2);
		
		[$a, $b] = $pkm1->calcoloDanno($mossa3, $pkm2);
		echo "$a --- $b";
	*/


	/*	//TEST 3 --- test di funzionamento senza oggetto Battaglia
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


	/*	//TEST 4 --- inizializzazione
		[$bat, $mess] = Battaglia::inizializzaBattaglia($J1, $J2);

		echo "<BR/> <BR/> <BR/>" . strval($bat->getUtente1());
		echo strval($bat->getUtente2());
		echo "$mess";
	*/


	/*	//TEST 5 --- primo utente forfeit
		[$bat, $mess] = Battaglia::inizializzaBattaglia($J1, $J2);

		$ris = $bat->generaRisposta($C1, $C2);
		echo "<BR/> <BR/> <BR/> $ris";

		$ris = $bat->generaRisposta($A1, $C2);
		echo "<BR/> <BR/> <BR/> $ris";

		$ris = $bat->generaRisposta($C1, $B2);
		echo "<BR/> <BR/> <BR/> $ris";
	*/


	/*	//TEST 5 --- primo utente switch (modificare squadre e messaggi per controllare tutti i possibili outcome)
		[$bat, $mess] = Battaglia::inizializzaBattaglia($J1, $J2);

		$ris = $bat->generaRisposta($B1, $B2);
		echo "<BR/> <BR/> <BR/> $ris";
		echo "<BR/> <BR/> <BR/>" . strval($bat->getPkmAttivo1());
		echo "<BR/> <BR/> <BR/>" . strval($bat->getPkmAttivo2());

		$ris = $bat->generaRisposta($D1, $B2);
		echo "<BR/> <BR/> <BR/> $ris";
		echo "<BR/> <BR/> <BR/>" . strval($bat->getPkmAttivo1());
		echo "<BR/> <BR/> <BR/>" . strval($bat->getPkmAttivo2());

		$ris = $bat->generaRisposta($B1, $A2);
		echo "<BR/> <BR/> <BR/> $ris";
		echo "<BR/> <BR/> <BR/>" . strval($bat->getPkmAttivo1());
		echo "<BR/> <BR/> <BR/>" . strval($bat->getPkmAttivo2());

		$bat->getUtente1()->getPkm2()->setPS(0);
		$bat->getUtente1()->getPkm3()->setPS(0);
		$bat->getUtente1()->getPkm4()->setPS(0);
		$bat->getUtente1()->getPkm5()->setPS(0);
		$bat->getUtente1()->getPkm6()->setPS(0);
		$ris = $bat->generaRisposta($B1, $A2);
		echo "<BR/> <BR/> <BR/> $ris";
		echo "<BR/> <BR/> <BR/>" . strval($bat->getPkmAttivo1());
		echo "<BR/> <BR/> <BR/>" . strval($bat->getPkmAttivo2());
	*/
	

	/* //TEST 6 --- primo utente mossa (modificare squadre e messaggi per controllare tutti i possibili outcome)
		[$bat, $mess] = Battaglia::inizializzaBattaglia($J1, $J2);

		$ris = $bat->generaRisposta($A1, $A2);
		echo "<BR/> <BR/> <BR/> $ris";
		echo "<BR/> <BR/> <BR/>" . strval($bat->getPkmAttivo1());
		echo "<BR/> <BR/> <BR/>" . strval($bat->getPkmAttivo2());

		$bat->getUtente1()->getPkm2()->setPS(0);
		$bat->getUtente1()->getPkm3()->setPS(0);
		$bat->getUtente1()->getPkm4()->setPS(0);
		$bat->getUtente1()->getPkm5()->setPS(0);
		$bat->getUtente1()->getPkm6()->setPS(0);
		$ris = $bat->generaRisposta($A1, $A2);
		echo "<BR/> <BR/> <BR/> $ris";
		echo "<BR/> <BR/> <BR/>" . strval($bat->getPkmAttivo1());
		echo "<BR/> <BR/> <BR/>" . strval($bat->getPkmAttivo2());
	*/
	

?>

</body>
