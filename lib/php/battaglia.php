<?php
	//includo le funzioni del database
	include "dbcontroller.php";

	//matrice delle efficacie dei tipi (riga indica attaccante, colonna difensore)
	const efficacie = array(
		"normale" =>	array(
							"normale" =>	1,
							"fuoco" => 		1,
							"acqua" => 		1,
							"elettro" => 	1,
							"erba" => 		1,
							"ghiaccio" => 	1,
							"lotta" => 		1,
							"veleno" => 	1,
							"terra" => 		1,
							"volante" => 	1,
							"psico" => 		1,
							"coleottero" => 1,
							"roccia" => 	0.5,
							"spettro" => 	0,
							"drago" => 		1,
							"buio" => 		1,
							"acciaio" =>	0.5,
							"folletto" =>	1
						),

		"fuoco" =>		array(
							"normale" =>	1,
							"fuoco" => 		0.5,
							"acqua" => 		0.5,
							"elettro" => 	1,
							"erba" => 		2,
							"ghiaccio" => 	2,
							"lotta" => 		1,
							"veleno" => 	1,
							"terra" => 		1,
							"volante" => 	1,
							"psico" => 		1,
							"coleottero" => 2,
							"roccia" => 	0.5,
							"spettro" => 	1,
							"drago" => 		0.5,
							"buio" => 		1,
							"acciaio" =>	2,
							"folletto" =>	1
						),

		"acqua" =>		array(
							"normale" =>	1,
							"fuoco" => 		2,
							"acqua" => 		0.5,
							"elettro" => 	1,
							"erba" => 		0.5,
							"ghiaccio" => 	1,
							"lotta" => 		1,
							"veleno" => 	1,
							"terra" => 		2,
							"volante" => 	1,
							"psico" => 		1,
							"coleottero" => 1,
							"roccia" => 	2,
							"spettro" => 	1,
							"drago" => 		0.5,
							"buio" => 		1,
							"acciaio" =>	1,
							"folletto" =>	1
						),

		"elettro" =>	array(
							"normale" =>	1,
							"fuoco" => 		1,
							"acqua" => 		2,
							"elettro" => 	0.5,
							"erba" => 		0.5,
							"ghiaccio" => 	1,
							"lotta" => 		1,
							"veleno" => 	1,
							"terra" => 		0,
							"volante" => 	2,
							"psico" => 		1,
							"coleottero" => 1,
							"roccia" => 	1,
							"spettro" => 	1,
							"drago" => 		0.5,
							"buio" => 		1,
							"acciaio" =>	1,
							"folletto" =>	1
						),

		"erba" =>		array(
							"normale" =>	1,
							"fuoco" => 		0.5,
							"acqua" => 		2,
							"elettro" => 	1,
							"erba" => 		0.5,
							"ghiaccio" => 	1,
							"lotta" => 		1,
							"veleno" => 	0.5,
							"terra" => 		2,
							"volante" => 	0.5,
							"psico" => 		1,
							"coleottero" => 0.5,
							"roccia" => 	2,
							"spettro" => 	1,
							"drago" => 		0.5,
							"buio" => 		1,
							"acciaio" =>	0.5,
							"folletto" =>	1
						),

		"ghiaccio" =>	array(
							"normale" =>	1,
							"fuoco" => 		0.5,
							"acqua" => 		0.5,
							"elettro" => 	1,
							"erba" => 		2,
							"ghiaccio" => 	0.5,
							"lotta" => 		1,
							"veleno" => 	1,
							"terra" => 		2,
							"volante" => 	2,
							"psico" => 		1,
							"coleottero" => 1,
							"roccia" => 	1,
							"spettro" => 	1,
							"drago" => 		2,
							"buio" => 		1,
							"acciaio" =>	0.5,
							"folletto" =>	1
						),

		"lotta" =>		array(
							"normale" =>	2,
							"fuoco" => 		1,
							"acqua" => 		1,
							"elettro" => 	1,
							"erba" => 		1,
							"ghiaccio" => 	2,
							"lotta" => 		1,
							"veleno" => 	0.5,
							"terra" => 		1,
							"volante" => 	0.5,
							"psico" => 		0.5,
							"coleottero" => 0.5,
							"roccia" => 	2,
							"spettro" => 	0,
							"drago" => 		1,
							"buio" => 		2,
							"acciaio" =>	2,
							"folletto" =>	0.5
						),

		"veleno" =>		array(
							"normale" =>	1,
							"fuoco" => 		1,
							"acqua" => 		1,
							"elettro" => 	1,
							"erba" => 		2,
							"ghiaccio" => 	1,
							"lotta" => 		1,
							"veleno" => 	0.5,
							"terra" => 		0.5,
							"volante" => 	1,
							"psico" => 		1,
							"coleottero" => 1,
							"roccia" => 	0.5,
							"spettro" => 	0.5,
							"drago" => 		1,
							"buio" => 		1,
							"acciaio" =>	0,
							"folletto" =>	2
						),
		"terra" =>		array(
							"normale" =>	1,
							"fuoco" => 		2,
							"acqua" => 		1,
							"elettro" => 	2,
							"erba" => 		0.5,
							"ghiaccio" => 	1,
							"lotta" => 		1,
							"veleno" => 	2,
							"terra" => 		1,
							"volante" => 	0,
							"psico" => 		1,
							"coleottero" => 0.5,
							"roccia" => 	2,
							"spettro" => 	1,
							"drago" => 		1,
							"buio" => 		1,
							"acciaio" =>	2,
							"folletto" =>	1
						),

		"volante" =>	array(
							"normale" =>	1,
							"fuoco" => 		1,
							"acqua" => 		1,
							"elettro" => 	0.5,
							"erba" => 		2,
							"ghiaccio" => 	1,
							"lotta" => 		2,
							"veleno" => 	1,
							"terra" => 		1,
							"volante" => 	1,
							"psico" => 		1,
							"coleottero" => 2,
							"roccia" => 	0.5,
							"spettro" => 	1,
							"drago" => 		1,
							"buio" => 		1,
							"acciaio" =>	0.5,
							"folletto" =>	1
						),

		"psico" =>		array(
							"normale" =>	1,
							"fuoco" => 		1,
							"acqua" => 		1,
							"elettro" => 	1,
							"erba" => 		1,
							"ghiaccio" => 	1,
							"lotta" => 		2,
							"veleno" => 	2,
							"terra" => 		1,
							"volante" => 	1,
							"psico" => 		0.5,
							"coleottero" => 1,
							"roccia" => 	1,
							"spettro" => 	1,
							"drago" => 		1,
							"buio" => 		0,
							"acciaio" =>	0.5,
							"folletto" =>	1
						),

		"coleottero" =>	array(
							"normale" =>	1,
							"fuoco" => 		0.5,
							"acqua" => 		1,
							"elettro" => 	1,
							"erba" => 		2,
							"ghiaccio" => 	1,
							"lotta" => 		0.5,
							"veleno" => 	0.5,
							"terra" => 		1,
							"volante" => 	0.5,
							"psico" => 		2,
							"coleottero" => 1,
							"roccia" => 	1,
							"spettro" => 	0.5,
							"drago" => 		1,
							"buio" => 		2,
							"acciaio" =>	0.5,
							"folletto" =>	0.5
						),

		"roccia" =>		array(
							"normale" =>	1,
							"fuoco" => 		2,
							"acqua" => 		1,
							"elettro" => 	1,
							"erba" => 		1,
							"ghiaccio" => 	2,
							"lotta" => 		0.5,
							"veleno" => 	1,
							"terra" => 		0.5,
							"volante" => 	2,
							"psico" => 		1,
							"coleottero" => 2,
							"roccia" => 	1,
							"spettro" => 	1,
							"drago" => 		1,
							"buio" => 		1,
							"acciaio" =>	0.5,
							"folletto" =>	1
						),

		"spettro" =>	array(
							"normale" =>	0,
							"fuoco" => 		1,
							"acqua" => 		1,
							"elettro" => 	1,
							"erba" => 		1,
							"ghiaccio" => 	1,
							"lotta" => 		1,
							"veleno" => 	1,
							"terra" => 		1,
							"volante" => 	1,
							"psico" => 		2,
							"coleottero" => 1,
							"roccia" => 	1,
							"spettro" => 	2,
							"drago" => 		1,
							"buio" => 		0.5,
							"acciaio" =>	1,
							"folletto" =>	1
						),

		"drago" =>		array(
							"normale" =>	1,
							"fuoco" => 		1,
							"acqua" => 		1,
							"elettro" => 	1,
							"erba" => 		1,
							"ghiaccio" => 	1,
							"lotta" => 		1,
							"veleno" => 	1,
							"terra" => 		1,
							"volante" => 	1,
							"psico" => 		1,
							"coleottero" => 1,
							"roccia" => 	1,
							"spettro" => 	1,
							"drago" => 		2,
							"buio" => 		1,
							"acciaio" =>	0.5,
							"folletto" =>	0
						),

		"buio" =>		array(
							"normale" =>	1,
							"fuoco" => 		1,
							"acqua" => 		1,
							"elettro" => 	1,
							"erba" => 		1,
							"ghiaccio" => 	1,
							"lotta" => 		0.5,
							"veleno" => 	1,
							"terra" => 		1,
							"volante" => 	1,
							"psico" => 		2,
							"coleottero" => 1,
							"roccia" => 	1,
							"spettro" => 	2,
							"drago" => 		1,
							"buio" => 		0.5,
							"acciaio" =>	1,
							"folletto" =>	0.5
						),

		"acciaio" =>	array(
							"normale" =>	1,
							"fuoco" => 		0.5,
							"acqua" => 		0.5,
							"elettro" => 	0.5,
							"erba" => 		1,
							"ghiaccio" => 	2,
							"lotta" => 		1,
							"veleno" => 	1,
							"terra" => 		1,
							"volante" => 	1,
							"psico" => 		1,
							"coleottero" => 1,
							"roccia" => 	2,
							"spettro" => 	1,
							"drago" => 		1,
							"buio" => 		1,
							"acciaio" =>	0.5,
							"folletto" =>	2
						),
						
		"folletto" =>	array(
							"normale" =>	1,
							"fuoco" => 		0.5,
							"acqua" => 		1,
							"elettro" => 	1,
							"erba" => 		1,
							"ghiaccio" => 	1,
							"lotta" => 		2,
							"veleno" => 	0.5,
							"terra" => 		1,
							"volante" => 	1,
							"psico" => 		1,
							"coleottero" => 1,
							"roccia" => 	1,
							"spettro" => 	1,
							"drago" => 		2,
							"buio" => 		2,
							"acciaio" =>	0.5,
							"folletto" =>	1
						)
	);


	//array contenente i vari messaggi a seconda delle efficacie
	const messaggiEfficacie = array(
		100 => 	"Il colpo è andato a segno.",
		200 => 	"Il colpo è stato superefficace!",
		400 =>	"Il colpo è stato iperefficace!!!",
		50  => 	"Il colpo è stato poco efficace!",
		25  =>	"Il colpo è stato scarsamente efficace!!!",
		0   => 	"Il colpo è stato inefficace..."
	);


	//array contenente i vari messaggi a seconda della presenza del brutto colpo
	const messaggiBC = array(
		15 =>	"Brutto colpo!",
		10 => 	"Colpo normale."
	);


	/*
		-------------------------------------------------------------------------------------------------------------------
		-------------------------------------------------------------------------------------------------------------------
		-------------------------------------------------------------------------------------------------------------------
	*/


	//classe per oggetto Pokemon
	class Pokemon {
		private $id;	//intero
		private $nome;	//stringa

		//stringhe
		private $tipo1;
		private $tipo2; //può essere null

		//interi
		private $ps;	//se 0 significa che pokemon esausto
		private $att;
		private $dif;
		private $atts;
		private $difs;
		private $vel;
		
		//oggetti Mossa
		private $mossa1;
		private $mossa2;
		private $mossa3;
		private $mossa4;


		//costruttore
		function __construct($id, $nome, $tipo1, $tipo2, $ps, $att, $dif, $atts, $difs, $vel, $mossa1, $mossa2, $mossa3, $mossa4) {
			$this->id = $id;
			$this->nome = $nome;

			$this->tipo1 = $tipo1;
			$this->tipo2 = $tipo2;

			$this->ps = $ps;
			$this->att = $att;
			$this->dif = $dif;
			$this->atts = $atts;
			$this->difs = $difs;
			$this->vel = $vel;

			$this->mossa1 = $mossa1;
			$this->mossa2 = $mossa2;
			$this->mossa3 = $mossa3;
			$this->mossa4 = $mossa4;
		}


		//funzioni getter
		function getID() { return $this->id; }
		function getNome() { return $this->nome; }
		function getTipo1() { return $this->tipo1; }
		function getTipo2() { return $this->tipo2; }
		function getPS() { return $this->ps; }
		function getAtt() { return $this->att; }
		function getDif() { return $this->dif; }
		function getAtts() { return $this->atts; }
		function getDifs() { return $this->difs; }
		function getVel() { return $this->vel; }
		function getMossa1() { return $this->mossa1; }
		function getMossa2() { return $this->mossa2; }
		function getMossa3() { return $this->mossa3; }
		function getMossa4() { return $this->mossa4; }


		//funzioni setter
		function setPS($ps) { $this->ps = $ps; }


		//conversione dell'oggetto in stringa
		function __toString() {
			return
				"+++++++++++++++++++++++++++++++++++++++++++ <BR/>"
				.
				"
					POKEMON: <BR/> <BR/>
					ID:		$this->id <BR/>
					NOME	$this->nome <BR/>
					TIPO1:	$this->tipo1 <BR/>
					TIPO2:	$this->tipo2 <BR/>
					PS: 	$this->ps <BR/>
					ATT: 	$this->att <BR/>
					DIF: 	$this->dif <BR/>
					ATTS: 	$this->atts <BR/>
					DIFS: 	$this->difs <BR/>
					VEL: 	$this->vel <BR/>
				"
				.
				$this->mossa1->__toString() . " <BR/>"
				.
				$this->mossa2->__toString() . " <BR/>"
				.
				$this->mossa3->__toString() . " <BR/>"
				.
				$this->mossa4->__toString() . " <BR/>"
				.
				"+++++++++++++++++++++++++++++++++++++++++++ <BR/>";
		}


		//calcolo del danno
		function calcoloDanno($mossa, $avversario) {
			//vedo se devo usare statistiche fisiche o speciali
			$attacco;
			$difesa;
			if($mossa->getCategoria() == "fisico") {
				$attacco = $this->att;
				$difesa = $avversario->getDif();
			}
			else {
				$attacco = $this->atts;
				$difesa = $avversario->getDifs();
			}

			//calcolo il valore della stab (same type attack bonus)
			$stab;
			if($mossa->getTipo() == $this->tipo1 || ( !(is_null($this->tipo2)) &&  $mossa->getTipo() == $this->tipo2 )) $stab = 1.5;
			else $stab = 1;

			//calcolo l'efficacia di tipo --- MANDARE MESSAGGIO
			$efficacia = efficacie[$mossa->getTipo()][$avversario->getTipo1()];
			if( !(is_null($avversario->getTipo2())) ) $efficacia *= efficacie[$mossa->getTipo()][$avversario->getTipo2()];

			//calcolo la presenza del brutto colpo --- MANDARE MESSAGGIO IN CASO AFFERMATIVO
			$brutto_colpo;
			if(rand(0, 10000) <= 625) $brutto_colpo = 1.5;
			else $brutto_colpo = 1;

			//calcolo l'aggiustamento casuale
			$agg_cas = rand(85, 100) / 100;

			//ritorno l'intero indicante il danno da infliggere
			return (int) round( (( 110 * $attacco * $mossa->getPotenza() / (250 * $difesa) ) + 2) * $efficacia * $stab * $brutto_colpo * $agg_cas );
		}
	}


	/*
		-------------------------------------------------------------------------------------------------------------------
		-------------------------------------------------------------------------------------------------------------------
		-------------------------------------------------------------------------------------------------------------------
	*/


	//classe per oggetto Mossa
	class Mossa {
		private $id;			//intero
		private $nome;			//stringa
		private $tipo;			//stringa
		private $categoria;		//stringa
		private $potenza;		//intero
		private $precisione;	//intero


		function __construct($id, $nome, $tipo, $categoria, $potenza, $precisione) {
			$this->id = $id;
			$this->nome = $nome;
			$this->tipo = $tipo;
			$this->categoria = $categoria;
			$this->potenza = $potenza;
			$this->precisione = $precisione;
		}


		//funzioni getter
		function getID() { return $this->id; }
		function getNome() { return $this->nome; }
		function getTipo() { return $this->tipo; }
		function getCategoria() { return $this->categoria; }
		function getPotenza() { return $this->potenza; }
		function getPrecisione() { return $this->precisione; }


		//conversione dell'oggetto in stringa
		function __toString() {
			return 
				"
					------------------------------------------- <BR/>
					MOSSA: <BR/> <BR/>
					ID:				$this->id <BR/>
					NOME			$this->nome <BR/>
					TIPO:			$this->tipo <BR/>
					CATEGORIA:		$this->categoria <BR/>
					POTENZA: 		$this->potenza <BR/>
					PRECISIONE: 	$this->precisione <BR/>
				";
		}
	}


	/*
		-------------------------------------------------------------------------------------------------------------------
		-------------------------------------------------------------------------------------------------------------------
		-------------------------------------------------------------------------------------------------------------------
	*/


	//classe per oggetto Utente
	class Utente {
		private $username;	//stringa
		private $pkm1;		//oggetti Pokemon
		private $pkm2;
		private $pkm3;
		private $pkm4;
		private $pkm5;
		private $pkm6;


		//costruttore
		function __construct($username, $pkm1, $pkm2, $pkm3, $pkm4, $pkm5, $pkm6) {
			$this->username = $username;

			$this->pkm1 = $pkm1;
			$this->pkm2 = $pkm2;
			$this->pkm3 = $pkm3;
			$this->pkm4 = $pkm4;
			$this->pkm5 = $pkm5;
			$this->pkm6 = $pkm5;
		}


		//funzioni getter
		function getUsername() { return $this->username; }
		function getPkm1() { return $this->pkm1; }
		function getPkm2() { return $this->pkm2; }
		function getPkm3() { return $this->pkm3; }
		function getPkm4() { return $this->pkm4; }
		function getPkm5() { return $this->pkm5; }
		function getPkm6() { return $this->pkm6; }


		//conversione dell'oggetto in stringa
		function __toString() {
			return 
				"=========================================== <BR/>"
				.
				"UTENTE: <BR/> <BR/> USERNAME: $this->username <BR/>"
				.
				$this->pkm1->__toString() . "<BR/>"
				.
				$this->pkm2->__toString() . "<BR/>"
				.
				$this->pkm3->__toString() . "<BR/>"
				.
				$this->pkm4->__toString() . "<BR/>"
				.
				$this->pkm5->__toString() . "<BR/>"
				.
				$this->pkm6->__toString()
				.
				"=========================================== <BR/>";
		}
	}


	/*
		-------------------------------------------------------------------------------------------------------------------
		-------------------------------------------------------------------------------------------------------------------
		-------------------------------------------------------------------------------------------------------------------
	*/


	//classe per oggetto Battaglia
	class Battaglia {
		//variabile indicante il controller del database per la battaglia
		private $dbcon;		//oggetto DBController

		private $utente1;	//oggetti Utente
		private $utente2;

		//variabili indicanti pokemon attivi per i due utenti
		private $pkmAttivo1;	//oggetti Pokemon
		private $pkmAttivo2;

		
		//per modularizzare la creazione di un oggetto Mossa
		private static function ritornaMossa($mossa_id) {
			$mossa = $this->dbcon->getMossaById($mossa_id);
			return new Mossa($mossa_id, $mossa[1], $mossa[2], $mossa[3], (int)$mossa[4], (int)$mossa[5]);
		}


		//per modularizzare la creazione di un oggetto Pokemon
		private static function ritornaPokemon($pokemon_id, $mossa1, $mossa2, $mossa3, $mossa4) {
			$pkm = $this->$dbcon->getPokemonById($pokemon_id);
			return new Pokemon($pokemon_id, $pkm[1], $pkm[2], $pkm[3], (int)$pkm[4], (int)$pkm[5], (int)$pkm[6], (int)$pkm[7], (int)$pkm[8], (int)$pkm[9], $mossa1, $mossa2, $mossa3, $mossa4);
		}


		//per modularizzare la creazione di un oggetto Utente
		private static function ritornaUtente($mess_init) {
			//ricavo l'oggetto json
			$obj_init = json_decode($mess_init);

			//array dove salvare gli oggetti Pokemon componenti la sua squadra
			$arraySquadra = array();

			//creo e salvo la squadra ed i loro moveset
			$squadra = $obj_init->squadra;
			for($i=0; $i<6; $i++) {
				$arraySquadra[$i] = Battaglia::ritornaPokemon(
					$squadra[$i]->id,
					Battaglia::ritornaMossa( $squadra[$i]->mosse[0] ),
					Battaglia::ritornaMossa( $squadra[$i]->mosse[1] ),
					Battaglia::ritornaMossa( $squadra[$i]->mosse[2] ),
					Battaglia::ritornaMossa( $squadra[$i]->mosse[3] )
				);
			}

			return new Utente(
				$obj_init->utente,
				$arraySquadra[0],
				$arraySquadra[1],
				$arraySquadra[2],
				$arraySquadra[3],
				$arraySquadra[4],
				$arraySquadra[5]
			);
		}


		//costruttore, prende messaggi di inizializzazione come input
		function __construct($mess_init1, $mess_init2) {
			$this->dbcon = DBController::getController();

			$this->utente1 = Battaglia::ritornaUtente($mess_init1);
			$this->pkmAttivo1 = $this->utente1->getPkm1();

			$this->utente2 = Battaglia::ritornaUtente($mess_init2);
			$this->pkmAttivo2 = $this->utente2->getPkm1();
		}


		//funzioni getter
		function getDbcon() { return $this->dbcon; }
		function getUtente1() { return $this->utente1; }
		function getUtente2() { return $this->utente2; }
		function getPkmAttivo1() { return $this->pkmAttivo1; }
		function getPkmAttivo2() { return $this->pkmAttivo2; }


		//funzioni setter
		function setPkmAttivo1($pkm) { $this->setPkmAttivo1 = $pkm; }
		function setPkmAttivo2($pkm) { $this->setPkmAttivo2 = $pkm; }


		//conversione dell'oggetto in stringa
		function __toString() {
			return 
				"<HR/>"
				.
				"UTENTE 1: <BR/>" . $this->utente1->__toString()
				.
				"POKEMON ATTIVO 1: <BR/>" . $this->utente2->__toString()
				.
				"UTENTE 2: <BR/>" . $this->pkmAttivo1->__toString()
				.
				"POKEMON ATTIVO 2: <BR/>" . $this->pkmAttivo2->__toString()
				.
				"<HR/>";
		}


		//metodo che prende in input stringa json messaggi battaglia dai client e restituisce quella di output
		function genera_risposta($mess_batt1, $mess_batt2) {
			//...
		}
	}	

?>
