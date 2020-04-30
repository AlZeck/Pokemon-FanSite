<?php
	
	//classe per oggetto Battaglia
	class Battaglia {
		//variabile indicante il controller del database per la battaglia
		private $dbcon;		//oggetto DBController

		//variabili indicanti i due sfidanti
		private $utente1;	//oggetti Utente
		private $utente2;

		//variabili indicanti pokemon attivi per i due utenti
		private $pkmAttivo1;	//oggetti Pokemon
		private $pkmAttivo2;

		
		//per modularizzare la creazione di un oggetto Mossa
		private function ritornaMossa($mossa_id) {
			$mossa = $this->getDbcon()->getMossaById($mossa_id);
			return new Mossa($mossa_id, $mossa[1], $mossa[2], $mossa[3], (int)$mossa[4], (int)$mossa[5]);
		}


		//per modularizzare la creazione di un oggetto Pokemon
		private function ritornaPokemon($pokemon_id, $mossa1, $mossa2, $mossa3, $mossa4) {
			$pkm = $this->getDbcon()->getPokemonById($pokemon_id);
			return new Pokemon($pokemon_id, $pkm[1], $pkm[2], $pkm[3], (int)$pkm[4], (int)$pkm[5], (int)$pkm[6], (int)$pkm[7], (int)$pkm[8], (int)$pkm[9], $mossa1, $mossa2, $mossa3, $mossa4);
		}


		//per modularizzare la creazione di un oggetto Utente
		private function ritornaUtente($mess_init) {
			//ricavo l'oggetto json
			$obj_init = json_decode($mess_init);

			//array dove salvare gli oggetti Pokemon componenti la sua squadra
			$arraySquadra = array();

			//creo e salvo la squadra ed i loro moveset
			$squadra = $obj_init->squadra;
			for($i=0; $i<6; $i++) {
				$arraySquadra[$i] = $this->ritornaPokemon(
					$squadra[$i]->id,
					$this->ritornaMossa( $squadra[$i]->mosse[0] ),
					$this->ritornaMossa( $squadra[$i]->mosse[1] ),
					$this->ritornaMossa( $squadra[$i]->mosse[2] ),
					$this->ritornaMossa( $squadra[$i]->mosse[3] )
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
		private function __construct($mess_init1, $mess_init2) {
			$this->dbcon = DBController::getController();

			$this->utente1 = $this->ritornaUtente($mess_init1);
			$this->pkmAttivo1 = $this->getUtente1()->getPkm1();

			$this->utente2 = $this->ritornaUtente($mess_init2);
			$this->pkmAttivo2 = $this->getUtente2()->getPkm1();
		}


		//funzione da chiamare per creare oggetto Battaglia e inviare primi messaggi al client
		static function inizializzaBattaglia($mess_init1, $mess_init2) {
			$battaglia = new Battaglia($mess_init1, $mess_init2);

			//faccio delle inizializzazioni fittizie per evitare di triggerare i warning di php su messaggio, primo e secondo
			$messaggio = new \stdClass();
			$messaggio->primo = new \stdClass();
			$messaggio->secondo = new \stdClass();

			$messaggio->primo->utente = $battaglia->getUtente1()->getUsername();
			$messaggio->primo->azione = "switch_";
			$messaggio->primo->valore = $battaglia->getPkmAttivo1()->getID();
			$messaggio->primo->danno = 0;
			$messaggio->primo->eff_bc = "";

			$messaggio->secondo->utente = $battaglia->getUtente2()->getUsername();
			$messaggio->secondo->azione = "switch_";
			$messaggio->secondo->valore = $battaglia->getPkmAttivo2()->getID();
			$messaggio->secondo->danno = 0;
			$messaggio->secondo->eff_bc = "";

			//tupla: primo posto oggetto Battaglia, secondo posto primo messaggio da inviare a client
			return [$battaglia, json_encode($messaggio)];
		}


		//funzioni getter
		function getDbcon() { return $this->dbcon; }
		function getUtente1() { return $this->utente1; }
		function getUtente2() { return $this->utente2; }
		function getPkmAttivo1() { return $this->pkmAttivo1; }
		function getPkmAttivo2() { return $this->pkmAttivo2; }


		//funzioni setter
		function setPkmAttivo1($pkm) { $this->pkmAttivo1 = $pkm; }
		function setPkmAttivo2($pkm) { $this->pkmAttivo2 = $pkm; }


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


		//per modularizzare gestione caso primo pokemon fa forfeit
		private function gestisciForfeit($obj_batt1, $obj_batt2) {
			//caso in cui forfeitta pure l'altro
			if($obj_batt2->azione == "forfeit") {
				//faccio delle inizializzazioni fittizie per evitare di triggerare i warning di php su messaggio, primo e secondo
				$messaggio = new \stdClass();
				$messaggio->primo = new \stdClass();
				$messaggio->secondo = new \stdClass();

				$messaggio->primo->utente = $obj_batt1->utente;
				$messaggio->primo->azione = "forfeit_perso";
				$messaggio->primo->valore = 0;
				$messaggio->primo->danno = 0;
				$messaggio->primo->eff_bc = "";

				$messaggio->secondo->utente = $obj_batt2->utente;
				$messaggio->secondo->azione = "forfeit_perso";
				$messaggio->secondo->valore = 0;
				$messaggio->secondo->danno = 0;
				$messaggio->secondo->eff_bc = "";

				return json_encode($messaggio);
			}

			//tutti altri casi
			else {
				//faccio delle inizializzazioni fittizie per evitare di triggerare i warning di php su messaggio, primo e secondo
				$messaggio = new \stdClass();
				$messaggio->primo = new \stdClass();
				$messaggio->secondo = new \stdClass();

				$messaggio->primo->utente = $obj_batt1->utente;
				$messaggio->primo->azione = "forfeit_perso";
				$messaggio->primo->valore = 0;
				$messaggio->primo->danno = 0;
				$messaggio->primo->eff_bc = "";

				$messaggio->secondo->utente = $obj_batt2->utente;
				$messaggio->secondo->azione = "_vinto";
				$messaggio->secondo->valore = 0;
				$messaggio->secondo->danno = 0;
				$messaggio->secondo->eff_bc = "";

				return json_encode($messaggio);
			}
		}


		//per modularizzare gestione caso primo pokemon fa switch
		private function gestisciSwitch($obj_batt1, $utente1, $obj_batt2, $utente2, $pkmAttivo2) {
			//prendo il nuovo pokemon per il primo utente
			$pkmAttivo1 = $utente1->dammiPokemon($obj_batt1->valore);
			
			//faccio il cambio di pokemon attivo per tale utente
			if($utente1 == $this->getUtente1()) {
				$this->setPkmAttivo1($pkmAttivo1);
			}
			else {
				$this->setPkmAttivo2($pkmAttivo1);
			}

			//prendo l'azione del secondo pokemon
			$azione2 = $obj_batt2->azione;

			//faccio delle inizializzazioni fittizie per evitare di triggerare i warning di php su messaggio, primo e secondo
			$messaggio = new \stdClass();
			$messaggio->primo = new \stdClass();
			$messaggio->secondo = new \stdClass();

			//caso in cui l'altro attacca
			if($azione2 == "mossa") {
				$mossa2 = $pkmAttivo2->dammiMossa($obj_batt2->valore);
				[$danno2, $eff_bc2] = $pkmAttivo2->calcoloDanno($mossa2, $pkmAttivo1);
				$ps1 = $pkmAttivo1->getPS();

				if($ps1 - $danno2 <= 0) {	//pokemon1 esausto
					$pkmAttivo1->setPS(0);

					$messaggio->primo->utente = $utente1->getUsername();
					$messaggio->primo->azione = "switch_switch";
					$messaggio->primo->valore = $obj_batt1->valore;
					$messaggio->primo->danno = 0;
					$messaggio->primo->eff_bc = "";

					$messaggio->secondo->utente = $utente2->getUsername();
					$messaggio->secondo->azione = "mossa_attesa";
					$messaggio->secondo->valore = $obj_batt2->valore;
					$messaggio->secondo->danno = $ps1;
					$messaggio->secondo->eff_bc = $eff_bc2;

					return json_encode($messaggio);
				}

				else {	//pokemon1 ancora in piedi
					$pkmAttivo1->setPS($ps1 - $danno2);

					$messaggio->primo->utente = $utente1->getUsername();
					$messaggio->primo->azione = "switch_";
					$messaggio->primo->valore = $obj_batt1->valore;
					$messaggio->primo->danno = 0;
					$messaggio->primo->eff_bc = "";

					$messaggio->secondo->utente = $utente2->getUsername();
					$messaggio->secondo->azione = "mossa_";
					$messaggio->secondo->valore = $obj_batt2->valore;
					$messaggio->secondo->danno = $danno2;
					$messaggio->secondo->eff_bc = $eff_bc2;

					return json_encode($messaggio);
				}
			}

			//caso in cui l'altro cambia pokemon anch'esso
			else if($azione2 == "switch") {
				//faccio il cambio di pokemon attivo per tale utente
				if($utente2 == $this->getUtente1()) {
					$this->setPkmAttivo1( $utente2->dammiPokemon($obj_batt2->valore) );
				}
				else {
					$this->setPkmAttivo2( $utente2->dammiPokemon($obj_batt2->valore) );
				}

				$messaggio->primo->utente = $utente1->getUsername();
				$messaggio->primo->azione = "switch_";
				$messaggio->primo->valore = $obj_batt1->valore;
				$messaggio->primo->danno = 0;
				$messaggio->primo->eff_bc = "";

				$messaggio->secondo->utente = $utente2->getUsername();
				$messaggio->secondo->azione = "switch_";
				$messaggio->secondo->valore = $obj_batt2->valore;
				$messaggio->secondo->danno = 0;
				$messaggio->secondo->eff_bc = "";

				return json_encode($messaggio);
			}

			//caso in cui l'altro è in attesa
			else {	//$azione2 == "attesa"
				$messaggio->primo->utente = $utente1->getUsername();
				$messaggio->primo->azione = "switch_";
				$messaggio->primo->valore = $obj_batt1->valore;
				$messaggio->primo->danno = 0;
				$messaggio->primo->eff_bc = "";

				$messaggio->secondo->utente = $utente2->getUsername();
				$messaggio->secondo->azione = "attesa_";
				$messaggio->secondo->valore = 0;
				$messaggio->secondo->danno = 0;
				$messaggio->secondo->eff_bc = "";

				return json_encode($messaggio);
			}
		}


		//per modularizzare gestione caso primo pokemon fa mossa (e quindi anche secondo per lo schema logico)
		private function gestisciMossa($obj_batt1, $utente1, $pkmAttivo1, $obj_batt2, $utente2, $pkmAttivo2) {
			$mossa1 = $pkmAttivo1->dammiMossa($obj_batt1->valore);
			[$danno1, $eff_bc1] = $pkmAttivo1->calcoloDanno($mossa1, $pkmAttivo2);
			$ps2 = $pkmAttivo2->getPS();

			//faccio delle inizializzazioni fittizie per evitare di triggerare i warning di php su messaggio, primo e secondo
			$messaggio = new \stdClass();
			$messaggio->primo = new \stdClass();
			$messaggio->secondo = new \stdClass();

			if($ps2 - $danno1 <= 0) {	//pokemon2 esausto
				$pkmAttivo2->setPS(0);

				if($utente2->isSconfitto()) {	//utente2 non ha più pokemon disponibili
					$messaggio->primo->utente = $utente1->getUsername();
					$messaggio->primo->azione = "mossa_vinto";
					$messaggio->primo->valore = $obj_batt1->valore;
					$messaggio->primo->danno = $ps2;
					$messaggio->primo->eff_bc = $eff_bc1;

					$messaggio->secondo->utente = $utente2->getUsername();
					$messaggio->secondo->azione = "_perso";
					$messaggio->secondo->valore = 0;
					$messaggio->secondo->danno = 0;
					$messaggio->secondo->eff_bc = "";

					return json_encode($messaggio);
				}
				else {	//utente2 ha altri pokemon disponibili
					$messaggio->primo->utente = $utente1->getUsername();
					$messaggio->primo->azione = "mossa_attesa";
					$messaggio->primo->valore = $obj_batt1->valore;
					$messaggio->primo->danno = $ps2;
					$messaggio->primo->eff_bc = $eff_bc1;

					$messaggio->secondo->utente = $utente2->getUsername();
					$messaggio->secondo->azione = "_switch";
					$messaggio->secondo->valore = 0;
					$messaggio->secondo->danno = 0;
					$messaggio->secondo->eff_bc = "";

					return json_encode($messaggio);
				}
			}

			else {	//pokemon2 ancora in piedi
				$pkmAttivo2->setPS($ps2 - $danno1);

				$mossa2 = $pkmAttivo2->dammiMossa($obj_batt2->valore);
				[$danno2, $eff_bc2] = $pkmAttivo2->calcoloDanno($mossa2, $pkmAttivo1);
				$ps1 = $pkmAttivo1->getPS();

				if($ps1 - $danno2 <= 0) {	//pokemon1 esausto
					$pkmAttivo1->setPS(0);

					if($utente1->isSconfitto()) {	//utente1 non ha più pokemon disponibili
						$messaggio->primo->utente = $utente1->getUsername();
						$messaggio->primo->azione = "mossa_perso";
						$messaggio->primo->valore = $obj_batt1->valore;
						$messaggio->primo->danno = $danno1;
						$messaggio->primo->eff_bc = $eff_bc1;

						$messaggio->secondo->utente = $utente2->getUsername();
						$messaggio->secondo->azione = "mossa_vinto";
						$messaggio->secondo->valore = $obj_batt2->valore;
						$messaggio->secondo->danno = $ps1;
						$messaggio->secondo->eff_bc = $eff_bc2;

						return json_encode($messaggio);
					}

					else {	//utente1 ha altri pokemon disponibili
						$messaggio->primo->utente = $utente1->getUsername();
						$messaggio->primo->azione = "mossa_switch";
						$messaggio->primo->valore = $obj_batt1->valore;
						$messaggio->primo->danno = $danno1;
						$messaggio->primo->eff_bc = $eff_bc1;

						$messaggio->secondo->utente = $utente2->getUsername();
						$messaggio->secondo->azione = "mossa_attesa";
						$messaggio->secondo->valore = $obj_batt2->valore;
						$messaggio->secondo->danno = $ps1;
						$messaggio->secondo->eff_bc = $eff_bc2;

						return json_encode($messaggio);
					}
				}

				else {	//pokemon1 ancora in piedi
					$pkmAttivo1->setPS($ps1 - $danno2);

					$messaggio->primo->utente = $utente1->getUsername();
					$messaggio->primo->azione = "mossa_";
					$messaggio->primo->valore = $obj_batt1->valore;
					$messaggio->primo->danno = $danno1;
					$messaggio->primo->eff_bc = $eff_bc1;

					$messaggio->secondo->utente = $utente2->getUsername();
					$messaggio->secondo->azione = "mossa_";
					$messaggio->secondo->valore = $obj_batt2->valore;
					$messaggio->secondo->danno = $danno2;
					$messaggio->secondo->eff_bc = $eff_bc2;

					return json_encode($messaggio);
				}
			}
		}


		//metodo che prende in input stringa json messaggi battaglia dai client e restituisce quella di output
		function generaRisposta($mess_batt1, $mess_batt2) {
			//ricavo gli oggetti json
			$obj_batt1 = json_decode($mess_batt1);
			$obj_batt2 = json_decode($mess_batt2);

			//se uno dei due forfeitta deve agire per primo
			if($obj_batt1->azione == "forfeit") return $this->gestisciForfeit($obj_batt1, $obj_batt2);
			else if($obj_batt2->azione == "forfeit") return $this->gestisciForfeit($obj_batt2, $obj_batt1);

			//ricavo l'utente ed il pokemon attivo di chi appartiene il messaggio
			$utente1;
			$utente2;
			$pkmAttivo1;
			$pkmAttivo2;

			if($this->getUtente1()->getUsername() == $obj_batt1->utente) {
				$utente1 = $this->getUtente1();
				$utente2 = $this->getUtente2();
				$pkmAttivo1 = $this->getPkmAttivo1();
				$pkmAttivo2 = $this->getPkmAttivo2();
			}
			else {
				$utente1 = $this->getUtente2();
				$utente2 = $this->getUtente1();
				$pkmAttivo1 = $this->getPkmAttivo2();
				$pkmAttivo2 = $this->getPkmAttivo1();
			}

			//se uno dei due cambia pokemon deve agire per primo
			if($obj_batt1->azione == "switch") return $this->gestisciSwitch($obj_batt1, $utente1, $obj_batt2, $utente2, $pkmAttivo2);
			else if($obj_batt2->azione == "switch") return $this->gestisciSwitch($obj_batt2, $utente2, $obj_batt1, $utente1, $pkmAttivo1);

			//altrimenti agisce prima chi è più veloce (se stessa velocità si decide casualmente)
			if( $pkmAttivo1->getVel() > $pkmAttivo2->getVel() || ( ( $pkmAttivo1->getVel() == $pkmAttivo2->getVel() ) && rand(1,2)==1 ) )
				return $this->gestisciMossa($obj_batt1, $utente1, $pkmAttivo1, $obj_batt2, $utente2, $pkmAttivo2);
			else
				return $this->gestisciMossa($obj_batt2, $utente2, $pkmAttivo2, $obj_batt1, $utente1, $pkmAttivo1);
		}
	}	

?>
