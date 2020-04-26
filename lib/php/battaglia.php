<?php

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


	//-------------------------------------------------------------------------------------------------------------------


	//classe per oggetto Pokemon
	class Pokemon {
		var $id;	//intero
		var $nome;	//stringa
		var $uber;	//booleano

		//stringhe
		var $tipo1;
		var $tipo2; //può essere null

		//interi
		var $ps;	//se 0 significa che pokemon esausto
		var $att;
		var $dif;
		var $atts;
		var $difs;
		var $vel;
		
		//oggetti Mossa
		var $mossa1;
		var $mossa2;
		var $mossa3;
		var $mossa4;

		//costruttore
		function __construct($id, $nome, $tipo1, $tipo2, $ps, $att, $dif, $atts, $difs, $vel, $uber, $mossa1, $mossa2, $mossa3, $mossa4) {
			$this->id = $id;
			$this->nome = $nome;
			$this->uber = $uber;

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

		//setter dei PS
		function setPS($ps) {
			$this->ps = $ps;
		}

		//calcolo del danno
		function calcoloDanno($mossa, $avversario) {
			$attacco;
			$difesa;
			if($mossa->categoria == "fisico") {
				$attacco = $this->att;
				$difesa = $avversario->dif;
			}
			else {
				$attacco = $this->atts;
				$difesa = $avversario->difs;
			}

			$stab;
			if($mossa->tipo == $this->tipo1 || ( !(is_null($this->tipo2)) &&  $mossa->tipo == $this->tipo2 )) $stab = 1.5;
			else $stab = 1;

			$efficacia = $mossa->calcoloEfficacia($avversario);

			$brutto_colpo;
			if(rand(0, 10000) <= 625) $brutto_colpo = 1.5;
			else $brutto_colpo = 1;
			//mandare messaggio del brutto colpo

			$N = rand(85, 100) / 100;

			return (int) round( (( 110 * $attacco * $mossa->potenza / (250 * $difesa) ) + 2) * $efficacia * $stab * $brutto_colpo * $N );
		}
	}


	//-------------------------------------------------------------------------------------------------------------------


	//classe per oggetto Mossa
	class Mossa {
		var $id;			//intero
		var $nome;			//stringa
		var $tipo;			//stringa
		var $categoria;		//stringa
		var $potenza;		//intero
		var $precisione;	//intero
		var $descrizione;	//stringa	--- TENERE LA DESCRIZIONE QUI DENTRO OPPURE NO?

		function __construct($id, $nome, $tipo, $categoria, $potenza, $precisione, $descrizione) {
			$this->id = $id;
			$this->nome = $nome;
			$this->tipo = $tipo;
			$this->categoria = $categoria;
			$this->potenza = $potenza;
			$this->precisione = $precisione;
			$this->descrizione = $descrizione;
		}

		//calcolo dell'efficacia
		function calcoloEfficacia($avversario) {
			$eff = $efficacie[$this->tipo][$avversario->tipo1];
			if( !(is_null($avversario->tipo2)) ) $eff *= $efficacie[$this->tipo][$avversario->tipo2];

			if(eff == 1) {          //efficacia standard
				return eff;
				//return [eff, "Il colpo è andato a segno."];
			}
			else if(eff == 2) {     //superefficacia
				return eff;
				//return [eff, "Il colpo è stato superefficace!"];
			}
			else if(eff == 4) {     //iperefficacia
				return eff;
				//return [eff, "Il colpo è stato iperefficace!!!"];
			}
			else if(eff == 0.5) {   //poca efficacia
				return eff;
				//return [eff, "Il colpo è stato poco efficace!"];
			}
			else if(eff == 0.25) {  //iperefficacia
				return eff;
				//return [eff, "Il colpo è stato scarsamente efficace!!!"];
			}
			else {                  //inefficacia   (eff == 0)
				return eff;
				//return [eff, "Il colpo è stato inefficace..."];
			}
		}
	}


	//-------------------------------------------------------------------------------------------------------------------


	//classe per oggetto Utente
	class Utente {
		var $username;	//stringa

		var $pkm1;		//oggetti Pokemon
		var $pkm2;
		var $pkm3;
		var $pkm4;
		var $pkm5;
		var $pkm6;

		function __construct($username, $pkm1, $pkm2, $pkm3, $pkm4, $pkm5, $pkm6) {
			$this->username = $username;

			$this->pkm1 = $pkm1;
			$this->pkm2 = $pkm2;
			$this->pkm3 = $pkm3;
			$this->pkm4 = $pkm4;
			$this->pkm5 = $pkm5;
			$this->pkm6 = $pkm5;
		}
	}


	//-------------------------------------------------------------------------------------------------------------------


	//classe per oggetto Battaglia
	class Battaglia {
		var $utente1;	//oggetti Utente
		var $utente2;

		//variabili indicanti pokemon attivi per i due utenti
		var $pkmAttivo1;	//oggetti Pokemon
		var $pkmAttivo2;

		//costruttore prende messaggi di inizializzazione come input
		function __construct($mess_init1, $mess_init2) {
			//...
		}

		//funzione per settare il nuovo pokemon attivo 1
		function setPkmAttivo1($pkmAttivo1) {
			$this->setPkmAttivo1 = $pkmAttivo1;
		}

		//funzione per settare il nuovo pokemon attivo 2
		function setPkmAttivo2($pkmAttivo2) {
			$this->setPkmAttivo2 = $pkmAttivo2;
		}

		//metodo che prende in input stringa json messaggi battaglia daI client e restituisce quella di output
		function genera_risposta($mess_batt1, $mess_batt2) {
			//...
		}
	}

?>
