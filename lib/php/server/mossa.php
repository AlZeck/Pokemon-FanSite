<?php

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
					------------------------------------------- <BR/>
				";
		}
    }
    
?>