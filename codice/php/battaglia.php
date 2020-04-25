<?php

	//costante "metà" per indicare la poca efficacia nella matrice sottostante (per simmetria)
	const m = 0.5;

	//matrice delle efficacie dei tipi (in base a indici dell'array soprastante)
	//indice di riga indica attaccante, indice di colonna difensore
	const efficacie = array(
		"normale" =>	array(
							1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, m, 0, 1, 1, m, 1
						),

		"fuoco" =>		array(
							1, m, m, 1, 2, 2, 1, 1, 1, 1, 1, 2, m, 1, m, 1, 2, 1
						),

		"acqua" =>		array(
							1, 2, m, 1, m, 1, 1, 1, 2, 1, 1, 1, 2, 1, m, 1, 1, 1
						),

		"elettro" =>	array(
							1, 1, 2, m, m, 1, 1, 1, 0, 2, 1, 1, 1, 1, m, 1, 1, 1
						),

		"erba" =>		array(
							1, m, 2, 1, m, 1, 1, m, 2, m, 1, m, 2, 1, m, 1, m, 1
						),

		"ghiaccio" =>	array(
							1, m, m, 1, 2, m, 1, 1, 2, 2, 1, 1, 1, 1, 2, 1, m, 1
						),

		"lotta" =>		array(
							2, 1, 1, 1, 1, 2, 1, m, 1, m, m, m, 2, 0, 1, 2, 2, m
						),

		"veleno" =>		array(
							1, 1, 1, 1, 2, 1, 1, m, m, 1, 1, 1, m, m, 1, 1, 0, 2
						),
		"terra" =>		array(
							1, 2, 1, 2, m, 1, 1, 2, 1, 0, 1, m, 2, 1, 1, 1, 2, 1
						),

		"volante" =>	array(
							1, 1, 1, m, 2, 1, 2, 1, 1, 1, 1, 2, m, 1, 1, 1, m, 1
						),

		"psico" =>		array(
							1, 1, 1, 1, 1, 1, 2, 2, 1, 1, m, 1, 1, 1, 1, 0, m, 1
						),

		"coleottero" =>	array(
							1, m, 1, 1, 2, 1, m, m, 1, m, 2, 1, 1, m, 1, 2, m, m
						),

		"roccia" =>		array(
							1, 2, 1, 1, 1, 2, m, 1, m, 2, 1, 2, 1, 1, 1, 1, m, 1
						),

		"spettro" =>	array(
							0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, m, 1, 1
						),

		"drago" =>		array(
							1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, m, 0
						),

		"buio" =>		array(
							1, 1, 1, 1, 1, 1, m, 1, 1, 1, 2, 1, 1, 2, 1, m, 1, m
						),

		"acciaio" =>	array(
							1, m, m, m, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, m, 2
						),
						
		"folletto" =>	array(
							1, m, 1, 1, 1, 1, 2, m, 1, 1, 1, 1, 1, 1, 2, 2, m, 1
						)
	);

	//classe per oggetto Pokemon
	class Pokemon {
		//allenatore, attivo, esausto


		var $id;
		var $nome;
		var $tipo1;
		var $tipo2;   //può essere null
		var $ps;
		var $att;
		var $dif;
		var $atts;
		var $difs;
		var $vel;
		var $uber;

		//4 mosse

		function __construct($id, $nome, $tipo1, $tipo2, $ps, $att, $dif, $atts, $difs, $vel, $uber) {
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
			$this->uber = $uber;
		}

		//calcolo stab (same type attack bonus)
		function stab($potenza_mossa, $tipo_mossa) {
			if($tipo_mossa == $this->tipo1 || ( !(is_null($this->tipo2)) && $tipo_mossa == $this->tipo2 )) return $potenza_mossa + ($potenza_mossa/2);
			else return $potenza_mossa;
		}

		//calcolo del danno
		function calcoloDanno() {

		}
	}


	//classe per oggetto Mossa
	class Mossa {
		var $id;
		var $nome;
		var $tipo;
		var $categoria;
		var $potenza;
		var $precisione;
		var $descrizione;

		function __construct( $par1, $par2 ) {
			$this->id = $id;
			$this->nome = $nome;
			$this->tipo = $tipo;
			$this->categoria = $categoria;
			$this->potenza = $potenza;
			$this->precisione = $precisione;
			$this->descrizione = $descrizione;
		}

		//calcolo efficacia
	}



	//fare la free degli oggetti php


	class Utente {
		//username
		//squadra
	}


	class Battaglia {
		//utente1
		//utente2

		//costruttore

		//metodo che prende in input stringa json messaggio battaglia da client e restituisce quella di output

	}


?>
