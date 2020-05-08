//classe per l'oggetto Battaglia
class Battaglia {
    /*  PARAMETRI
        _protagonista       : oggetto Vue con element protagonista
        _avversario         : oggetto Vue con element avversario
    */


    //costruttore
    constructor(protagonista, avversario) {
        this._protagonista = protagonista;
        this._avversario = avversario;
    }


    //getter
    get protagonista() { return this._io; }
    get avversario() { return this._avversario; }


    //funzione per scrivere sulla gui il testo della battaglia
    static scriviTestoBattaglia(testo) {
        //scrivo nell'area di testo apposita il testo passato in input cancellando il precedente.
    }


    //funzione per mostrare sulla gui la mossa sferrata
    static eseguiAnimazioneBattaglia(tipo, chi) {
        //a seconda di valore di chi cambio il luogo della gui dove mostrare l'animazione
        //fai un'animazione del tipo giusto sul pokemon giusto
    }


    //funzione per mostrare sulla gui l'abbassamento dei ps
    static eseguiAnimazioneBarra(nuoviPS, chi) {
        //a seconda di valore di chi cambio la barra dove mostrare l'animazione
        //fai un'animazione della barra che scende dal livello attuale a quello passato
        //se sotto la metà falla da verde a gialla, sotto un quarto rossa
        //se il pokemon attivo è anche quello selezionato aggiorna i ps anche lì dopo
    }


    //funzione per mostrare sulla gui il ritiro di un pokemon dalla lotta
    static eseguiAnimazioneRitiro(chi) {
        //a seconda di valore di chi cambio il luogo della gui dove mostrare l'animazione
    }


    //funzione per costringere il giocatore a switchare disabilitando le altre opzioni
    static switchForzato() {
        //attiva bottone per lo switch
        //disabilita i bottoni di mossa e forfeit, può solo switchare
    }


    //funzione per permettere al giocatore di scegliere la sua prossima azione
    static attivaTutto() {
        //riattivare i bottoni di switch (se pokemon selezionato valido), mosse e forfeit per poter essere usati
    }


    //funzione per mandare al server un messaggio di "attesa"
    static mandaAttesa(username) {
        //mando al server un messaggio con azione attesa e valore 0 e username quello in input
        //blocco qualsiasi opzione possa scegliere
    }


    //funzione per mandare un pokemon in campo
    static eseguiAnimazioneSwitch(pokemon, chi) {
        //a seconda di valore di chi cambio il luogo della gui dove mostrare tali cosa
        //cambio la barra dei ps per mostrare nome e ps giusti per il pokemon passato
        //faccio animazione per far apparire lo sprite corretto
    }


    //funzione che gestisce la battaglia lato client in base a messaggi che gli arrivano e restituisce stringa json di risposta
    generaRisposta(mess_batt) {
        //ricavo l'oggetto json
        obj_batt = JSON.parse(mess_batt);

        //il primo a muoversi sono io
        if(obj_batt.primo.utente == this._io.username) {
            //prendo le rispettive azioni
            miaAzione = obj_batt.primo.azione.split("_");
            suaAzione = obj_batt.secondo.azione.split("_");

            //caso in cui uso una mossa
            if(miaAzione[0] == "mossa") {
                mossa = this.mioPkmAttivo.dammiMossa(obj_batt.primo.valore);

                Battaglia.scriviTestoBattaglia("Il mio " + this.mioPkmAttivo.nome + " usa " + mossa.nome + ". ");
                Battaglia.eseguiAnimazioneBattaglia(mossa.tipo, "io");
                Battaglia.scriviTestoBattaglia(obj_batt.primo.comunicato);

                nuoviPS = this.suoPkmAttivo.ps - obj_batt.primo.danno;
                if(nuoviPS < 0) nuoviPS = 0;
                this.suoPkmAttivo.ps = nuoviPS;
                Battaglia.eseguiAnimazioneBarra(nuoviPS, "avversario");

                //caso in cui ho vinto
                if(miaAzione[1] == "vinto") {
                    Battaglia.scriviTestoBattaglia(this.suoPkmAttivo.nome + " avversario è esausto!");
                    Battaglia.eseguiAnimazioneRitiro("avversario");
                    Battaglia.scriviTestoBattaglia(this.avversario.username + " non ha più pokemon disponibili! Hai vinto lo scontro!");

                    //faccio aspettare 5 secondi prima di reindirizzare (con impossibilità di tornare indietro) alla schermata di vittoria
                    setTimeout(window.location.replace(""), 5000);

                    return;
                }

                //caso in cui non ho vinto ma pokemon avversario esausto
                else if(miaAzione[1] == "attesa") {
                    Battaglia.scriviTestoBattaglia(this.suoPkmAttivo.nome + " avversario è esausto!");
                    Battaglia.eseguiAnimazioneRitiro("avversario");
                    Battaglia.scriviTestoBattaglia("In attesa dell'azione di " + this.avversario.username + "...");

                    //mando al server un messaggio di attesa da parte mia
                    Battaglia.mandaAttesa(this.io.username);
                    return;
                }

                //avversario è sopravvissuto e usa la mossa (per forza)
                mossa = this.suoPkmAttivo.dammiMossa(obj_batt.secondo.valore);

                Battaglia.scriviTestoBattaglia(this.suoPkmAttivo.nome + " avversario usa " + mossa.nome + ". ");
                Battaglia.eseguiAnimazioneBattaglia(mossa.tipo, "avversario");
                Battaglia.scriviTestoBattaglia(obj_batt.secondo.comunicato);

                nuoviPS = this.mioPkmAttivo.ps - obj_batt.secondo.danno;
                if(nuoviPS < 0) nuoviPS = 0;
                this.mioPkmAttivo.ps = nuoviPS;
                Battaglia.eseguiAnimazioneBarra(nuoviPS, "io");

                //caso in cui ho perso
                if(miaAzione[1] == "perso") {
                    Battaglia.scriviTestoBattaglia("Il mio " + this.mioPkmAttivo.nome + " è esausto!");
                    Battaglia.eseguiAnimazioneRitiro("io");
                    Battaglia.scriviTestoBattaglia("Non hai più pokemon disponibili! Hai perso lo scontro!");

                    //faccio aspettare 5 secondi prima di reindirizzare (con impossibilità di tornare indietro) alla schermata di sconfitta
                    setTimeout(window.location.replace(""), 5000);

                    return;
                }

                //caso in cui non ho perso ma mio pokemon esausto
                else if(miaAzione[1] == "switch") {
                    Battaglia.scriviTestoBattaglia("Il mio " + this.mioPkmAttivo.nome + " è esausto!");
                    Battaglia.eseguiAnimazioneRitiro("io");
                    Battaglia.scriviTestoBattaglia("Scegli un pokemon da mandare in campo...");

                    Battaglia.switchForzato();
                    return;
                }

                //caso in cui il mio pokemon è sopravvissuto
                else {  //miaAzione[1] == "" (stringa vuota)
                    Battaglia.scriviTestoBattaglia("Scegli un'azione...");
                    Battaglia.attivaTutto();
                    return;
                }
            }

            //caso in cui faccio uno switch
            else if(miaAzione[0] == "switch") {
                Battaglia.scriviTestoBattaglia("Ritiro il mio " + this.mioPkmAttivo.nome + " dal campo.");
                Battaglia.eseguiAnimazioneRitiro("io");

                this.mioPkmAttivo = dammiPokemon(obj_batt.primo.valore);
                Battaglia.scriviTestoBattaglia("Mando il mio " + this.mioPkmAttivo.nome + " in campo.");
                Battaglia.eseguiAnimazioneSwitch(this.mioPkmAttivo, "io");

                //caso in cui l'avversario usa una mossa
                if(suaAzione[0] == "mossa") {
                    mossa = this.suoPkmAttivo.dammiMossa(obj_batt.secondo.valore);

                    Battaglia.scriviTestoBattaglia(this.suoPkmAttivo.nome + " avversario usa " + mossa.nome + ". ");
                    Battaglia.eseguiAnimazioneBattaglia(mossa.tipo, "avversario");
                    Battaglia.scriviTestoBattaglia(obj_batt.secondo.comunicato);

                    nuoviPS = this.mioPkmAttivo.ps - obj_batt.secondo.danno;
                    if(nuoviPS < 0) nuoviPS = 0;
                    this.mioPkmAttivo.ps = nuoviPS;
                    Battaglia.eseguiAnimazioneBarra(nuoviPS, "io");

                    //caso in cui il pokemon che avevo appena mandato diventa esausto
                    if(miaAzione[1] == "switch") {
                        Battaglia.scriviTestoBattaglia("Il mio " + this.mioPkmAttivo.nome + " è esausto!");
                        Battaglia.eseguiAnimazioneRitiro("io");
                        Battaglia.scriviTestoBattaglia("Scegli un pokemon da mandare in campo...");

                        Battaglia.switchForzato();
                        return;
                    }

                    //caso in cui il pokemon che avevo appena mandato è ancora vivo
                    else {  //miaAzione[1] == ""
                        Battaglia.scriviTestoBattaglia("Scegli un'azione...");
                        Battaglia.attivaTutto();
                        return;
                    }
                }

                //caso in cui l'avversario fa uno switch
                else if(suaAzione[0] == "switch") {
                    Battaglia.scriviTestoBattaglia(this.suoPkmAttivo.nome + " avversario è ritirato dal campo.");
                    Battaglia.eseguiAnimazioneRitiro("avversario");

                    this.suoPkmAttivo = this.io.dammiPokemon(obj_batt.secondo.valore);
                    Battaglia.scriviTestoBattaglia(this.suoPkmAttivo.nome + " avversario è mandato in campo.");
                    Battaglia.eseguiAnimazioneSwitch(this.suoPkmAttivo, "avversario");
                }

                //sia in caso di suo switch che in caso di sua attesa
                Battaglia.scriviTestoBattaglia("Scegli un'azione...");
                Battaglia.attivaTutto();
                return;
            }

            //caso in cui faccio forfeit
            else {  //miaAzione[0] == "forfeit"
                Battaglia.scriviTestoBattaglia("Hai forfeittato! Hai perso lo scontro!");

                //faccio aspettare 5 secondi prima di reindirizzare (con impossibilità di tornare indietro) alla schermata di sconfitta
                setTimeout(window.location.replace(""), 5000);

                return;
            }
        }


        //il primo a muoversi è l'avversario
        else {
            //prendo le rispettive azioni
            miaAzione = obj_batt.secondo.azione.split("_");
            suaAzione = obj_batt.primo.azione.split("_");

            //caso in cui l'avversario usa una mossa
            if(suaAzione[0] == "mossa") {
                mossa = this.suoPkmAttivo.dammiMossa(obj_batt.primo.valore);

                Battaglia.scriviTestoBattaglia(this.suoPkmAttivo.nome + " avversario usa " + mossa.nome + ". ");
                Battaglia.eseguiAnimazioneBattaglia(mossa.tipo, "avversario");
                Battaglia.scriviTestoBattaglia(obj_batt.primo.comunicato);

                nuoviPS = this.mioPkmAttivo.ps - obj_batt.primo.danno;
                if(nuoviPS < 0) nuoviPS = 0;
                this.mioPkmAttivo.ps = nuoviPS;
                Battaglia.eseguiAnimazioneBarra(nuoviPS, "io");

                //caso in cui ho perso
                if(suaAzione[1] == "vinto") {
                    Battaglia.scriviTestoBattaglia("Il mio " + this.mioPkmAttivo.nome + " è esausto!");
                    Battaglia.eseguiAnimazioneRitiro("io");
                    Battaglia.scriviTestoBattaglia("Non hai più pokemon disponibili! Hai perso lo scontro!");

                    //faccio aspettare 5 secondi prima di reindirizzare (con impossibilità di tornare indietro) alla schermata di sconfitta
                    setTimeout(window.location.replace(""), 5000);

                    return;
                }

                //caso in cui non ho perso ma mio pokemon esausto
                else if(suaAzione[1] == "attesa") {
                    Battaglia.scriviTestoBattaglia("Il mio " + this.mioPkmAttivo.nome + " è esausto!");
                    Battaglia.eseguiAnimazioneRitiro("io");
                    Battaglia.scriviTestoBattaglia("Scegli un pokemon da mandare in campo...");

                    Battaglia.switchForzato();
                    return;
                }

                //caso in cui uso una mossa (per forza)
                mossa = this.mioPkmAttivo.dammiMossa(obj_batt.secondo.valore);

                Battaglia.scriviTestoBattaglia("Il mio " + this.mioPkmAttivo.nome + " usa " + mossa.nome + ". ");
                Battaglia.eseguiAnimazioneBattaglia(mossa.tipo, "io");
                Battaglia.scriviTestoBattaglia(obj_batt.secondo.comunicato);

                nuoviPS = this.suoPkmAttivo.ps - obj_batt.secondo.danno;
                if(nuoviPS < 0) nuoviPS = 0;
                this.suoPkmAttivo.ps = nuoviPS;
                Battaglia.eseguiAnimazioneBarra(nuoviPS, "avversario");

                //caso in cui ho vinto
                if(suaAzione[1] == "perso") {
                    Battaglia.scriviTestoBattaglia(this.suoPkmAttivo.nome + " avversario è esausto!");
                    Battaglia.eseguiAnimazioneRitiro("avversario");
                    Battaglia.scriviTestoBattaglia(this.avversario.username + " non ha più pokemon disponibili! Hai vinto lo scontro!");

                    //faccio aspettare 5 secondi prima di reindirizzare (con impossibilità di tornare indietro) alla schermata di vittoria
                    setTimeout(window.location.replace(""), 5000);

                    return;
                }

                //caso in cui non ho vinto ma pokemon avversario esausto
                else if(suaAzione[1] == "switch") {
                    Battaglia.scriviTestoBattaglia(this.suoPkmAttivo.nome + " avversario è esausto!");
                    Battaglia.eseguiAnimazioneRitiro("avversario");
                    Battaglia.scriviTestoBattaglia("In attesa dell'azione di " + this.avversario.username + "...");

                    //mando al server un messaggio di attesa da parte mia
                    Battaglia.mandaAttesa(this.io.username);
                    return;
                }

                //caso in cui il pokemon avversario è sopravvissuto
                else {  //suaAzione[1] == "" (stringa vuota)
                    Battaglia.scriviTestoBattaglia("Scegli un'azione...");
                    Battaglia.attivaTutto();
                    return;
                }
            }

            //caso in cui l'avversario fa uno switch
            else if(suaAzione[0] == "switch") {
                Battaglia.scriviTestoBattaglia(this.suoPkmAttivo.nome + " avversario è ritirato dal campo.");
                Battaglia.eseguiAnimazioneRitiro("avversario");

                this.suoPkmAttivo = this.avversario.dammiPokemon(obj_batt.primo.valore);
                Battaglia.scriviTestoBattaglia(this.suoPkmAttivo.nome + " avversario è mandato in campo.");
                Battaglia.eseguiAnimazioneSwitch(this.suoPkmAttivo, "avversario");

                //caso in cui uso una mossa
                if(miaAzione[0] == "mossa") {
                    mossa = this.mioPkmAttivo.dammiMossa(obj_batt.secondo.valore);

                    Battaglia.scriviTestoBattaglia("Il mio " + this.mioPkmAttivo.nome + " usa " + mossa.nome + ". ");
                    Battaglia.eseguiAnimazioneBattaglia(mossa.tipo, "io");
                    Battaglia.scriviTestoBattaglia(obj_batt.secondo.comunicato);

                    nuoviPS = this.suoPkmAttivo.ps - obj_batt.secondo.danno;
                    if(nuoviPS < 0) nuoviPS = 0;
                    this.suoPkmAttivo.ps = nuoviPS;
                    Battaglia.eseguiAnimazioneBarra(nuoviPS, "avversario");

                    //caso in cui il pokemon che aveva appena mandato l'avversario diventa esausto
                    if(suaAzione[1] == "switch") {
                        Battaglia.scriviTestoBattaglia(this.suoPkmAttivo.nome + " avversario è esausto!");
                        Battaglia.eseguiAnimazioneRitiro("avversario");
                        Battaglia.scriviTestoBattaglia("In attesa dell'azione di " + this.avversario.username + "...");

                        //mando al server un messaggio di attesa da parte mia
                        Battaglia.mandaAttesa(this.io.username);
                        return;
                    }

                    //caso in cui il pokemon che aveva appena mandato l'avversario è ancora in piedi
                    else {  //suaAzione[1] == ""
                        Battaglia.scriviTestoBattaglia("Scegli un'azione...");
                        Battaglia.attivaTutto();
                        return;
                    }
                }

                //caso in cui faccio uno switch
                else if(miaAzione[0] == "switch") {
                    Battaglia.scriviTestoBattaglia("Ritiro il mio " + this.mioPkmAttivo.nome + " dal campo.");
                    Battaglia.eseguiAnimazioneRitiro("io");

                    this.mioPkmAttivo = dammiPokemon(obj_batt.secondo.valore);
                    Battaglia.scriviTestoBattaglia("Mando il mio " + this.mioPkmAttivo.nome + " in campo.");
                    Battaglia.eseguiAnimazioneSwitch(this.mioPkmAttivo, "io");
                }

                //sia in caso di mio switch che in caso di mia attesa
                Battaglia.scriviTestoBattaglia("Scegli un'azione...");
                Battaglia.attivaTutto();
                return;
            }

            //caso in cui l'avversario fa forfeit
            else {  //suaAzione[0] == "forfeit"
                //caso in cui faccio forfeit
                if(miaAzione[0] == "forfeit") {
                    Battaglia.scriviTestoBattaglia("Hai forfeittato! Hai perso lo scontro!");

                    //faccio aspettare 5 secondi prima di reindirizzare (con impossibilità di tornare indietro) alla schermata di sconfitta
                    setTimeout(window.location.replace(""), 5000);

                    return;
                }

                //caso in cui faccio altro
                else {  //non ho fatto forfeit
                    Battaglia.scriviTestoBattaglia("L'avversario ha forfeittato! Hai vinto lo scontro!");

                    //faccio aspettare 5 secondi prima di reindirizzare (con impossibilità di tornare indietro) alla schermata di vittoria
                    setTimeout(window.location.replace(""), 5000);

                    return;
                }
            }
        }
    }

}
