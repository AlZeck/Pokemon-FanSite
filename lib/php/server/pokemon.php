<?php

    include './mossa.php';
    include './utilities.php';
    

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


		//calcolo del danno inflitto
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
            $eff_bc = messaggiEfficacie[$efficacia * 100];

			//calcolo la presenza del brutto colpo --- MANDARE MESSAGGIO IN CASO AFFERMATIVO
			$brutto_colpo;
			if(rand(0, 10000) <= 625) $brutto_colpo = 1.5;
            else $brutto_colpo = 1;
            $eff_bc .= messaggiBC[$brutto_colpo * 10];

			//calcolo l'aggiustamento casuale
			$agg_cas = rand(85, 100) / 100;

            //tupla: primo posto l'intero indicante il danno da infliggere, secondo posto messaggio sull'efficacia ed il brutto colpo
			return [
                (int) round( (( 110 * $attacco * $mossa->getPotenza() / (250 * $difesa) ) + 2) * $efficacia * $stab * $brutto_colpo * $agg_cas ),
                $eff_bc
            ];
        }
        

        //funzione per prendere una mossa del pokemon dato un id valido
        function getMossaByID($id) {
            if($this->getMossa1()->getID() == $id) return $this->getMossa1();
            else if($this->getMossa2()->getID() == $id) return $this->getMossa2();
            else if($this->getMossa3()->getID() == $id) return $this->getMossa3();
            else return $this->getMossa4();
        }
	}

?>