<?php

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
			$this->pkm6 = $pkm6;
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
				"================================= <BR/>"
				.
				"UTENTE: <BR/> <BR/> USERNAME: $this->username <BR/> <BR/>"
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
				"================================= <BR/> <BR/>";
        }
        

        //funzione per prendere un pokemon della squadra dato un id valido
        function dammiPokemon($id) {
            if($this->getPkm1()->getID() == $id) return $this->getPkm1();
            else if($this->getPkm2()->getID() == $id) return $this->getPkm2();
            else if($this->getPkm3()->getID() == $id) return $this->getPkm3();
            else if($this->getPkm4()->getID() == $id) return $this->getPkm4();
            else if($this->getPkm5()->getID() == $id) return $this->getPkm5();
            else return $this->getPkm6();
        }


        //funzione per capire se tutti i pokemon della squadra sono esausti
        function isSconfitto() {
            if(
                $this->getPkm1()->getPS() == 0 &&
                $this->getPkm2()->getPS() == 0 &&
                $this->getPkm3()->getPS() == 0 &&
                $this->getPkm4()->getPS() == 0 &&
                $this->getPkm5()->getPS() == 0 &&
                $this->getPkm6()->getPS() == 0
            ) return true;

            else return false;
        }
    }
    
?>