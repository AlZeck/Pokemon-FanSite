//classe per l'oggetto Battaglia
class Battaglia {
    /*  PARAMETRI
        _mioVue : oggetto Vue con element mioVue
    */


    //costruttore (prende l'oggetto Vue già riempito, ovvero con gli username e anche la squadra completa del protagonista e anche l'oggetto BCPController
    //ALTERNATIVAMENTE si può fare costruttore che passa gli id di squadra e mosse assieme agli username e BCPController e crea il vue qui...
    constructor(mioVue) {
        this._mioVue = mioVue;
    }


    //getter
    get mioVue() { return this._mioVue; }


    //funzione per scrivere sulla gui il testo della battaglia (flag=1 in append, sennò in write)
    static scriviTestoBattaglia(testo, flag) {
        var boxTesto = document.getElementById("testoBattaglia");

        var vecchio = "";
        if(flag == 1) vecchio = boxTesto.innerText + " ";

        //testing
        boxTesto.innerText = vecchio + testo;

        /*
        boxTesto.innerText = vecchio;  //istantaneamente senza animazioni
        boxTesto.innerText = testo;    //con un animazione per la scritta che compare lettera per lettera
        */
    }


    //funzione per modularizzare gestione prima azione, da parte del protagonista e pari a mossa
    gestisciMossaPrt(obj_batt, primaAzione) {
        var mossa = this.mioVue.dammiMossaPrt(obj_batt.primo.valore);

        Battaglia.scriviTestoBattaglia(this.mioVue.activePkmPrt.nome + " alleato usa " + mossa.nome + ". ", 0);
        this.mioVue.subisciAnimazioneBattagliaAvv(mossa.tipo);
        Battaglia.scriviTestoBattaglia(obj_batt.primo.comunicato, 1);

        var nuoviPS = this.mioVue.activePkmAvv.ps - obj_batt.primo.danno;
        if(nuoviPS < 0) nuoviPS = 0;
        this.mioVue.activePkmAvv.ps = nuoviPS;
        this.mioVue.subisciAnimazioneBarraAvv(nuoviPS);

        //caso in cui protagonista ha vinto
        if(primaAzione[1] == "vinto") {
            Battaglia.scriviTestoBattaglia(this.mioVue.activePkmAvv.nome + " avversario è esausto! ", 0);
            this.mioVue.eseguiAnimazioneRitiroAvv();
            Battaglia.scriviTestoBattaglia(this.mioVue.avversario.username + " non ha più pokemon disponibili! Lo scontro è terminato!", 1);

            //faccio aspettare 5 secondi prima di reindirizzare (con impossibilità di tornare indietro) alla corretta schermata dei risultati
            setTimeout(function() { window.location.replace("./vittoria.html") }, 5000);
        }

        //caso in cui protagonista non ha vinto ma avversario esausto
        else if(primaAzione[1] == "attesa") {
            Battaglia.scriviTestoBattaglia(this.mioVue.activePkmAvv.nome + " avversario è esausto! ", 0);
            this.mioVue.eseguiAnimazioneRitiroAvv();

            Battaglia.scriviTestoBattaglia("In attesa dell'azione di " + this.mioVue.avversario.username + "...", 1);
            this.mioVue.mandaAttesa();
        }

        //caso in cui avversario è sopravvissuto e usa la mossa (per forza)
        else {
            var mossa = this.mioVue.dammiMossaAvv(obj_batt.secondo.valore);

            Battaglia.scriviTestoBattaglia(this.mioVue.activePkmAvv.nome + " avversario usa " + mossa.nome + ". ", 0);
            this.mioVue.subisciAnimazioneBattagliaPrt(mossa.tipo);
            Battaglia.scriviTestoBattaglia(obj_batt.secondo.comunicato, 1);

            nuoviPS = this.mioVue.activePkmPrt.ps - obj_batt.secondo.danno;
            if(nuoviPS < 0) nuoviPS = 0;
            this.mioVue.activePkmPrt.ps = nuoviPS;
            this.mioVue.subisciAnimazioneBarraPrt(nuoviPS);

            //caso in cui protagonista ha perso
            if(primaAzione[1] == "perso") {
                Battaglia.scriviTestoBattaglia(this.mioVue.activePkmPrt.nome + " alleato è esausto! ", 0);
                this.mioVue.eseguiAnimazioneRitiroPrt();
                Battaglia.scriviTestoBattaglia("Non hai più pokemon disponibili! Lo scontro è terminato!", 1);

                //faccio aspettare 5 secondi prima di reindirizzare (con impossibilità di tornare indietro) alla corretta schermata dei risultati
                setTimeout(function() { window.location.replace("./sconfitta.html") }, 5000);
            }

            //caso in cui protagonista non ha perso ma è esausto
            else if(primaAzione[1] == "switch") {
                Battaglia.scriviTestoBattaglia(this.mioVue.activePkmPrt.nome + " alleato è esausto! ", 0);
                this.mioVue.eseguiAnimazioneRitiroPrt();

                Battaglia.scriviTestoBattaglia("Scegli un pokemon da mandare in campo...", 1);
                this.mioVue.switchForzato();
            }

            //caso in cui anche protagonista è sopravvissuto
            else {  //primaAzione[1] == "" (stringa vuota)
                Battaglia.scriviTestoBattaglia("Scegli un'azione... ", 0);
                this.mioVue.attivaTutto();
            }
        }
    }


    //funzione per modularizzare gestione prima azione, da parte dell'avversario e pari a mossa
    gestisciMossaAvv(obj_batt, primaAzione) {
        var mossa = this.mioVue.dammiMossaAvv(obj_batt.primo.valore);

        Battaglia.scriviTestoBattaglia(this.mioVue.activePkmAvv.nome + " avversario usa " + mossa.nome + ". ", 0);
        this.mioVue.subisciAnimazioneBattagliaPrt(mossa.tipo);
        Battaglia.scriviTestoBattaglia(obj_batt.primo.comunicato, 1);

        var nuoviPS = this.mioVue.activePkmPrt.ps - obj_batt.primo.danno;
        if(nuoviPS < 0) nuoviPS = 0;
        this.mioVue.activePkmPrt.ps = nuoviPS;
        this.mioVue.subisciAnimazioneBarraPrt(nuoviPS);

        //caso in cui avversario ha vinto
        if(primaAzione[1] == "vinto") {
            Battaglia.scriviTestoBattaglia(this.mioVue.activePkmPrt.nome + " alleato è esausto! ", 0);
            this.mioVue.eseguiAnimazioneRitiroPrt();
            Battaglia.scriviTestoBattaglia("Non hai più pokemon disponibili! Lo scontro è terminato!", 1);

            //faccio aspettare 5 secondi prima di reindirizzare (con impossibilità di tornare indietro) alla corretta schermata dei risultati
            setTimeout(function() { window.location.replace("./sconfitta.html") }, 5000);
        }

        //caso in cui avversario non ha vinto ma protagonista esausto
        else if(primaAzione[1] == "attesa") {
            Battaglia.scriviTestoBattaglia(this.mioVue.activePkmPrt.nome + " alleato è esausto! ", 0);
            this.mioVue.eseguiAnimazioneRitiroPrt();

            Battaglia.scriviTestoBattaglia("Scegli un pokemon da mandare in campo...", 1);
            this.mioVue.switchForzato();
        }

        //caso in cui protagonista è sopravvissuto e usa la mossa (per forza)
        else {
            var mossa = this.mioVue.dammiMossaPrt(obj_batt.secondo.valore);

            Battaglia.scriviTestoBattaglia(this.mioVue.activePkmPrt.nome + " alleato usa " + mossa.nome + ". ", 0);
            this.mioVue.subisciAnimazioneBattagliaAvv(mossa.tipo);
            Battaglia.scriviTestoBattaglia(obj_batt.secondo.comunicato, 1);

            nuoviPS = this.mioVue.activePkmAvv.ps - obj_batt.secondo.danno;
            if(nuoviPS < 0) nuoviPS = 0;
            this.mioVue.activePkmAvv.ps = nuoviPS;
            this.mioVue.subisciAnimazioneBarraAvv(nuoviPS);

            //caso in cui avversario ha perso
            if(primaAzione[1] == "perso") {
                Battaglia.scriviTestoBattaglia(this.mioVue.activePkmAvv.nome + " avversario è esausto! ", 0);
                this.mioVue.eseguiAnimazioneRitiroAvv();
                Battaglia.scriviTestoBattaglia(this.mioVue.avversario.username + " non ha più pokemon disponibili! Lo scontro è terminato!", 1);

                //faccio aspettare 5 secondi prima di reindirizzare (con impossibilità di tornare indietro) alla corretta schermata dei risultati
                setTimeout(function() { window.location.replace("./vittoria.html") }, 5000);
            }

            //caso in cui avversario non ha perso ma è esausto
            else if(primaAzione[1] == "switch") {
                Battaglia.scriviTestoBattaglia(this.mioVue.activePkmAvv.nome + " avversario è esausto! ", 0);
                this.mioVue.eseguiAnimazioneRitiroAvv();

                Battaglia.scriviTestoBattaglia("In attesa dell'azione di " + this.mioVue.avversario.username + "...", 1);
                this.mioVue.mandaAttesa();
            }

            //caso in cui anche avversario è sopravvissuto
            else {  //primaAzione[1] == "" (stringa vuota)
                Battaglia.scriviTestoBattaglia("Scegli un'azione... ", 0);
                this.mioVue.attivaTutto();
            }
        }
    }


    //funzione per modularizzare gestione prima azione, da parte del protagonista e pari a switch
    gestisciSwitchPrt(obj_batt, primaAzione, secondaAzione) {
        Battaglia.scriviTestoBattaglia(this.mioVue.activePkmPrt.nome + " alleato è ritirato dal campo. ", 0);
        this.mioVue.eseguiAnimazioneRitiroPrt();

        this.mioVue.cambiaActivePkmPrt(obj_batt.primo.valore);
        this.mioVue.eseguiAnimazioneSwitchPrt();
        Battaglia.scriviTestoBattaglia(this.mioVue.activePkmPrt.nome + " alleato è mandato in campo.", 1);

        //caso in cui avversario usa una mossa
        if(secondaAzione[0] == "mossa") {
            var mossa = this.mioVue.dammiMossaAvv(obj_batt.secondo.valore);

            Battaglia.scriviTestoBattaglia(this.mioVue.activePkmAvv.nome + " avversario usa " + mossa.nome + ". ", 0);
            this.mioVue.subisciAnimazioneBattagliaPrt(mossa.tipo);
            Battaglia.scriviTestoBattaglia(obj_batt.secondo.comunicato, 1);

            var nuoviPS = this.mioVue.activePkmPrt.ps - obj_batt.secondo.danno;
            if(nuoviPS < 0) nuoviPS = 0;
            this.mioVue.activePkmPrt.ps = nuoviPS;
            this.mioVue.subisciAnimazioneBarraPrt(nuoviPS);

            //caso in cui il pokemon che protagonista aveva appena mandato diventa esausto
            if(primaAzione[1] == "switch") {
                Battaglia.scriviTestoBattaglia(this.mioVue.activePkmPrt.nome + " alleato è esausto! ", 0);
                this.mioVue.eseguiAnimazioneRitiroPrt();

                Battaglia.scriviTestoBattaglia("Scegli un pokemon da mandare in campo...", 1);
                this.mioVue.switchForzato();
            }

            //caso in cui il pokemon che protagonista aveva appena mandato è ancora vivo
            else {  //primaAzione[1] == ""
                Battaglia.scriviTestoBattaglia("Scegli un'azione... ", 0);
                this.mioVue.attivaTutto();
            }

            return;
        }

        //caso in cui avversario fa uno switch
        else if(secondaAzione[0] == "switch") {
            Battaglia.scriviTestoBattaglia(this.mioVue.activePkmAvv.nome + " avversario è ritirato dal campo. ", 0);
            this.mioVue.eseguiAnimazioneRitiroAvv();

            this.mioVue.cambiaActivePkmAvv(obj_batt.secondo.valore);
            this.mioVue.eseguiAnimazioneSwitchAvv();
            Battaglia.scriviTestoBattaglia(this.mioVue.activePkmAvv.nome + " avversario è mandato in campo.", 1);
        }

        //sia in caso di switch che in caso di attesa da parte dell'avversario
        Battaglia.scriviTestoBattaglia("Scegli un'azione... ", 0);
        this.mioVue.attivaTutto();
    }


    //funzione per modularizzare gestione prima azione, da parte dell'avversario e pari a switch
    gestisciSwitchAvv(obj_batt, primaAzione, secondaAzione) {
        Battaglia.scriviTestoBattaglia(this.mioVue.activePkmAvv.nome + " avversario è ritirato dal campo. ", 0);
        this.mioVue.eseguiAnimazioneRitiroAvv();

        this.mioVue.cambiaActivePkmAvv(obj_batt.primo.valore);
        this.mioVue.eseguiAnimazioneSwitchAvv();
        Battaglia.scriviTestoBattaglia(this.mioVue.activePkmAvv.nome + " avversario è mandato in campo.", 1);

        //caso in cui protagonista usa una mossa
        if(secondaAzione[0] == "mossa") {
            var mossa = this.mioVue.dammiMossaPrt(obj_batt.secondo.valore);

            Battaglia.scriviTestoBattaglia(this.mioVue.activePkmPrt.nome + " alleato usa " + mossa.nome + ". ", 0);
            this.mioVue.subisciAnimazioneBattagliaAvv(mossa.tipo);
            Battaglia.scriviTestoBattaglia(obj_batt.secondo.comunicato, 1);

            var nuoviPS = this.mioVue.activePkmAvv.ps - obj_batt.secondo.danno;
            if(nuoviPS < 0) nuoviPS = 0;
            this.mioVue.activePkmAvv.ps = nuoviPS;
            this.mioVue.subisciAnimazioneBarraAvv(nuoviPS);

            //caso in cui il pokemon che avversario aveva appena mandato diventa esausto
            if(primaAzione[1] == "switch") {
                Battaglia.scriviTestoBattaglia(this.mioVue.activePkmAvv.nome + " avversario è esausto! ", 0);
                this.mioVue.eseguiAnimazioneRitiroAvv();

                Battaglia.scriviTestoBattaglia("In attesa dell'azione di " + this.mioVue.avversario.username + "...", 1);
                this.mioVue.mandaAttesa();
            }

            //caso in cui il pokemon che avversario aveva appena mandato è ancora vivo
            else {  //primaAzione[1] == ""
                Battaglia.scriviTestoBattaglia("Scegli un'azione... ", 0);
                this.mioVue.attivaTutto();
            }

            return;
        }

        //caso in cui protagonista fa uno switch
        else if(secondaAzione[0] == "switch") {
            Battaglia.scriviTestoBattaglia(this.mioVue.activePkmPrt.nome + " alleato è ritirato dal campo. ", 0);
            this.mioVue.eseguiAnimazioneRitiroPrt();

            this.mioVue.cambiaActivePkmPrt(obj_batt.secondo.valore);
            this.mioVue.eseguiAnimazioneSwitchPrt();
            Battaglia.scriviTestoBattaglia(this.mioVue.activePkmPrt.nome + " alleato è mandato in campo.", 1);
        }

        //sia in caso di switch che in caso di attesa da parte del protagonista
        Battaglia.scriviTestoBattaglia("Scegli un'azione... ", 0);
        this.mioVue.attivaTutto();
    }


    //funzione per modularizzare gestione prima azione pari a forfeit
    gestisciForfeit(isPrimoPrt, secondaAzione) {
        //il protagonista ha forfeittato
        if(isPrimoPrt || secondaAzione[0] == "forfeit") {
            Battaglia.scriviTestoBattaglia("Hai forfeittato! Hai perso lo scontro!", 0);

            //faccio aspettare 5 secondi prima di reindirizzare (con impossibilità di tornare indietro) alla schermata di sconfitta
            setTimeout(function() { window.location.replace("./sconfitta.html") }, 5000);
        }

        //l'avversario ha forfeittato
        else {
            Battaglia.scriviTestoBattaglia("L'avversario ha forfeittato! Hai vinto lo scontro!", 0);

            //faccio aspettare 5 secondi prima di reindirizzare (con impossibilità di tornare indietro) alla schermata di vittoria
            setTimeout(function() { window.location.replace("./vittoria.html") }, 5000);
        }
    }


    //funzione che gestisce la battaglia lato client in base a messaggi che gli arrivano
    gestisciBattaglia(mess_batt) {
        //ricavo l'oggetto json
        var obj_batt = JSON.parse(mess_batt);

        //prendo le rispettive azioni
        var primaAzione = obj_batt.primo.azione.split("_");
        var secondaAzione = obj_batt.secondo.azione.split("_");

        //il primo a muoversi è il protagonista
        if(obj_batt.primo.utente == this.mioVue.protagonista.username) {
            //caso in cui primo usa una mossa
            if(primaAzione[0] == "mossa") this.gestisciMossaPrt(obj_batt, primaAzione);

            //caso in cui primo fa uno switch
            else if(primaAzione[0] == "switch") this.gestisciSwitchPrt(obj_batt, primaAzione, secondaAzione);

            //caso in cui primo forfeitta (primaAzione[0] == "forfeit")
            else this.gestisciForfeit(true, secondaAzione);

        }

        //il primo a muoversi è l'avversario
        else {
            //caso in cui primo usa una mossa
            if(primaAzione[0] == "mossa") this.gestisciMossaAvv(obj_batt, primaAzione);

            //caso in cui primo fa uno switch
            else if(primaAzione[0] == "switch") this.gestisciSwitchAvv(obj_batt, primaAzione, secondaAzione);

            //caso in cui primo forfeitta (primaAzione[0] == "forfeit")
            else this.gestisciForfeit(false, secondaAzione);
        }
    }

}
