//classe per l'oggetto Battaglia
class Battaglia {
    /*  PARAMETRI
        _battVue : oggetto Vue con element battVue

        _cpu    : oggetto Cpu
    */


    //costruttore (prende l'oggetto Vue già riempito, ovvero con gli username e anche la squadra completa del protagonista e anche l'oggetto BCPController
    //inoltre se si combatte contro una CPU la inizializza
    constructor(battVue, objCPU) {
        this._battVue = battVue;

        if(battVue.avversario.username == "CPU") {
            //se non è una rivincita contro la CPU
            if(objCPU == undefined) {
                this._cpu = new Cpu();
                this.battVue.bcpc.startCPU(this._cpu.squadra);
            }

            //se è una rivincita contro la CPU
            else {
                objCPU._indexActivePkm = 0;
                objCPU._ancoraVivi = [0, 1, 2, 3, 4, 5];
                this._cpu = objCPU;
            }            
        }
        else this._cpu = undefined;
    }


    //getter
    get battVue() { return this._battVue; }
    get cpu() { return this._cpu; }


    //funzione per mettere in pausa il flusso di una funzione per non fargli fare tutto assieme
    sleep(millisecondi) {
        return new Promise(resolve => setTimeout(resolve, millisecondi))
    }


    //funzione per scrivere sulla gui il testo della battaglia (flag=1 in append, sennò in write), durata media di 4 secondi.
    scriviTestoBattaglia(txt, flag) {
        var i = 0;
        var speed = 90;
        function typeWriter() {
            if (i < txt.length) {
                document.getElementById("testoBattaglia").innerHTML += txt.charAt(i);
                i++;
                setTimeout(typeWriter, speed);
            }
        }

        if(flag == 0) $("#testoBattaglia").html("");
        typeWriter();
    }


    //funzione per modularizzare gestione prima azione, da parte del protagonista e pari a mossa
    async gestisciMossaPrt(obj_batt, primaAzione) {
        var mossa = this.battVue.dammiMossa(obj_batt.primo.valore, this.battVue.activePkmPrt);

        this.scriviTestoBattaglia(this.battVue.activePkmPrt.nome + " alleato usa " + mossa.nome + ". ", 0);
        this.battVue.animazioneBattaglia("Prt", "Avv");

        await this.sleep(5000);
             
        this.scriviTestoBattaglia(obj_batt.primo.comunicato, 1);

        var nuoviPS = this.battVue.activePkmAvv.ps - obj_batt.primo.danno;
        if(nuoviPS < 0) nuoviPS = 0;
        this.battVue.activePkmAvv.ps = nuoviPS;

        await this.sleep(6000);

        //caso in cui protagonista ha vinto
        if(primaAzione[1] == "vinto") {
            this.scriviTestoBattaglia(this.battVue.activePkmAvv.nome + " avversario è esausto! ", 0);
            this.battVue.animazioneRitiro(this.battVue.avversario, "Avv");

            await this.sleep(5000);

            this.scriviTestoBattaglia(this.battVue.avversario.username + " non ha più pokemon disponibili! Lo scontro è terminato!", 1);

            await this.sleep(13000);

            //reindirizzo (senza possibilità di tornare indietro) sulla schermata di vittoria
            fetchEsitoPage("vittoria");
        }

        //caso in cui protagonista non ha vinto ma avversario esausto
        else if(primaAzione[1] == "attesa") {
            this.scriviTestoBattaglia(this.battVue.activePkmAvv.nome + " avversario è esausto! ", 0);
            this.battVue.animazioneRitiro(this.battVue.avversario, "Avv");

            await this.sleep(5000);

            //caso in cui l'avversario è la CPU
            if(this.battVue.avversario.username == "CPU") {
                this.cpu.attivoEsausto();
                var msgCPU = this.cpu.mandaSwitchCPU();
                this.battVue.bcpc.sendBattleCPUMessage(msgCPU);
            }

            this.scriviTestoBattaglia("In attesa dell'azione di " + this.battVue.avversario.username + "...", 1);

            await this.sleep(4000);

            this.battVue.mandaAttesa();
        }

        //caso in cui avversario è sopravvissuto e usa la mossa (per forza)
        else {
            var mossa = this.battVue.dammiMossa(obj_batt.secondo.valore, this.battVue.activePkmAvv);

            this.scriviTestoBattaglia(this.battVue.activePkmAvv.nome + " avversario usa " + mossa.nome + ". ", 0);
            this.battVue.animazioneBattaglia("Avv", "Prt");

            await this.sleep(5000);

            this.scriviTestoBattaglia(obj_batt.secondo.comunicato, 1);

            nuoviPS = this.battVue.activePkmPrt.ps - obj_batt.secondo.danno;
            if(nuoviPS < 0) nuoviPS = 0;
            this.battVue.activePkmPrt.ps = nuoviPS;

            await this.sleep(6000);

            //caso in cui protagonista ha perso
            if(primaAzione[1] == "perso") {
                this.scriviTestoBattaglia(this.battVue.activePkmPrt.nome + " alleato è esausto! ", 0);
                this.battVue.animazioneRitiro(this.battVue.protagonista, "Prt");

                await this.sleep(5000);

                this.scriviTestoBattaglia("Non hai più pokemon disponibili! Lo scontro è terminato!", 1);

                await this.sleep(13000);

                //reindirizzo (senza possibilità di tornare indietro) sulla schermata di sconfitta
                fetchEsitoPage("sconfitta");
            }

            //caso in cui protagonista non ha perso ma è esausto
            else if(primaAzione[1] == "switch") {
                this.scriviTestoBattaglia(this.battVue.activePkmPrt.nome + " alleato è esausto! ", 0);
                this.battVue.animazioneRitiro(this.battVue.protagonista, "Prt");

                await this.sleep(5000);

                //caso in cui l'avversario è la CPU
                if(this.battVue.avversario.username == "CPU") {
                    var msgCPU = this.cpu.mandaAttesaCPU();
                    this.battVue.bcpc.sendBattleCPUMessage(msgCPU);
                }

                this.scriviTestoBattaglia("Scegli un pokemon da mandare in campo...", 1);

                await this.sleep(4000);

                this.battVue.switchForzato();
            }

            //caso in cui anche protagonista è sopravvissuto
            else {  //primaAzione[1] == "" (stringa vuota)
                //caso in cui l'avversario è la CPU
                if(this.battVue.avversario.username == "CPU") {
                    var msgCPU = this.cpu.mandaAzioneCPU();
                    this.battVue.bcpc.sendBattleCPUMessage(msgCPU);
                }

                this.scriviTestoBattaglia("Scegli un'azione... ", 0);
                
                await this.sleep(2000);

                this.battVue.attivaTutto();
            }
        }

    }


    //funzione per modularizzare gestione prima azione, da parte dell'avversario e pari a mossa
    async gestisciMossaAvv(obj_batt, primaAzione) {
        var mossa = this.battVue.dammiMossa(obj_batt.primo.valore, this.battVue.activePkmAvv);

        this.scriviTestoBattaglia(this.battVue.activePkmAvv.nome + " avversario usa " + mossa.nome + ". ", 0);
        this.battVue.animazioneBattaglia("Avv", "Prt");

        await this.sleep(5000);

        this.scriviTestoBattaglia(obj_batt.primo.comunicato, 1);

        var nuoviPS = this.battVue.activePkmPrt.ps - obj_batt.primo.danno;
        if(nuoviPS < 0) nuoviPS = 0;
        this.battVue.activePkmPrt.ps = nuoviPS;

        await this.sleep(6000);

        //caso in cui avversario ha vinto
        if(primaAzione[1] == "vinto") {
            this.scriviTestoBattaglia(this.battVue.activePkmPrt.nome + " alleato è esausto! ", 0);
            this.battVue.animazioneRitiro(this.battVue.protagonista, "Prt");

            await this.sleep(5000);

            this.scriviTestoBattaglia("Non hai più pokemon disponibili! Lo scontro è terminato!", 1);

            await this.sleep(13000);

            //reindirizzo (senza possibilità di tornare indietro) sulla schermata di sconfitta
            fetchEsitoPage("sconfitta");
        }

        //caso in cui avversario non ha vinto ma protagonista esausto
        else if(primaAzione[1] == "attesa") {
            this.scriviTestoBattaglia(this.battVue.activePkmPrt.nome + " alleato è esausto! ", 0);
            this.battVue.animazioneRitiro(this.battVue.protagonista, "Prt");

            await this.sleep(5000);

            //caso in cui l'avversario è la CPU
            if(this.battVue.avversario.username == "CPU") {
                var msgCPU = this.cpu.mandaAttesaCPU();
                this.battVue.bcpc.sendBattleCPUMessage(msgCPU);
            }

            this.scriviTestoBattaglia("Scegli un pokemon da mandare in campo...", 1);
                
            await this.sleep(4000);
            
            this.battVue.switchForzato();
        }

        //caso in cui protagonista è sopravvissuto e usa la mossa (per forza)
        else {
            var mossa = this.battVue.dammiMossa(obj_batt.secondo.valore, this.battVue.activePkmPrt);

            this.scriviTestoBattaglia(this.battVue.activePkmPrt.nome + " alleato usa " + mossa.nome + ". ", 0);
            this.battVue.animazioneBattaglia("Prt", "Avv");

            await this.sleep(5000);

            this.scriviTestoBattaglia(obj_batt.secondo.comunicato, 1);

            nuoviPS = this.battVue.activePkmAvv.ps - obj_batt.secondo.danno;
            if(nuoviPS < 0) nuoviPS = 0;
            this.battVue.activePkmAvv.ps = nuoviPS;

            await this.sleep(6000);

            //caso in cui avversario ha perso
            if(primaAzione[1] == "perso") {
                this.scriviTestoBattaglia(this.battVue.activePkmAvv.nome + " avversario è esausto! ", 0);
                this.battVue.animazioneRitiro(this.battVue.avversario, "Avv");

                await this.sleep(5000);

                this.scriviTestoBattaglia(this.battVue.avversario.username + " non ha più pokemon disponibili! Lo scontro è terminato!", 1);

                await this.sleep(13000);

                //reindirizzo (senza possibilità di tornare indietro) sulla schermata di vittoria
                fetchEsitoPage("vittoria");
            }

            //caso in cui avversario non ha perso ma è esausto
            else if(primaAzione[1] == "switch") {
                this.scriviTestoBattaglia(this.battVue.activePkmAvv.nome + " avversario è esausto! ", 0);
                this.battVue.animazioneRitiro(this.battVue.avversario, "Avv");

                await this.sleep(5000);

                //caso in cui l'avversario è la CPU
                if(this.battVue.avversario.username == "CPU") {
                    this.cpu.attivoEsausto();
                    var msgCPU = this.cpu.mandaSwitchCPU();
                    this.battVue.bcpc.sendBattleCPUMessage(msgCPU);
                }

                this.scriviTestoBattaglia("In attesa dell'azione di " + this.battVue.avversario.username + "...", 1);

                await this.sleep(4000);
    
                this.battVue.mandaAttesa();
            }

            //caso in cui anche avversario è sopravvissuto
            else {  //primaAzione[1] == "" (stringa vuota)
                //caso in cui l'avversario è la CPU
                if(this.battVue.avversario.username == "CPU") {
                    var msgCPU = this.cpu.mandaAzioneCPU();
                    this.battVue.bcpc.sendBattleCPUMessage(msgCPU);
                }

                this.scriviTestoBattaglia("Scegli un'azione... ", 0);
                
                await this.sleep(2000);

                this.battVue.attivaTutto();
            }
        }
    }


    //funzione per modularizzare gestione prima azione, da parte del protagonista e pari a switch
    async gestisciSwitchPrt(obj_batt, primaAzione, secondaAzione) {
        //gestisco il caso del primo turno
        if(this.battVue.avversario.squadra.length == 1) {
            this.battVue.cambiaActivePkm(obj_batt.primo.valore, this.battVue.protagonista);
            this.battVue.animazioneSwitch(this.battVue.protagonista, "Prt");
            this.scriviTestoBattaglia(this.battVue.activePkmPrt.nome + " alleato è mandato in campo.", 0);

            await this.sleep(5500);

            this.battVue.cambiaActivePkm(obj_batt.secondo.valore, this.battVue.avversario);
            this.battVue.animazioneSwitch(this.battVue.avversario, "Avv");
            this.scriviTestoBattaglia(this.battVue.activePkmAvv.nome + " avversario è mandato in campo.", 0);

            await this.sleep(5500);

            //caso in cui l'avversario è la CPU
            if(this.battVue.avversario.username == "CPU") {
                var msgCPU = this.cpu.mandaAzioneCPU();
                this.battVue.bcpc.sendBattleCPUMessage(msgCPU);
            }

            this.scriviTestoBattaglia("Scegli un'azione... ", 0);
                
            await this.sleep(2000);

            this.battVue.attivaTutto();

            return;
        }

        //gestisco caso in cui switch non è forzato
        if(secondaAzione[0] != "attesa") {
            this.scriviTestoBattaglia(this.battVue.activePkmPrt.nome + " alleato è ritirato dal campo. ", 0);
            this.battVue.animazioneRitiro(this.battVue.protagonista, "Prt");

            await this.sleep(5500);
        }
        else this.scriviTestoBattaglia("", 0);

        this.battVue.cambiaActivePkm(obj_batt.primo.valore, this.battVue.protagonista);
        this.battVue.animazioneSwitch(this.battVue.protagonista, "Prt");
        this.scriviTestoBattaglia(this.battVue.activePkmPrt.nome + " alleato è mandato in campo.", 1);

        await this.sleep(5500);

        //caso in cui avversario usa una mossa
        if(secondaAzione[0] == "mossa") {
            var mossa = this.battVue.dammiMossa(obj_batt.secondo.valore, this.battVue.activePkmAvv);

            this.scriviTestoBattaglia(this.battVue.activePkmAvv.nome + " avversario usa " + mossa.nome + ". ", 0);
            this.battVue.animazioneBattaglia("Avv", "Prt");

            await this.sleep(5000);

            this.scriviTestoBattaglia(obj_batt.secondo.comunicato, 1);

            var nuoviPS = this.battVue.activePkmPrt.ps - obj_batt.secondo.danno;
            if(nuoviPS < 0) nuoviPS = 0;
            this.battVue.activePkmPrt.ps = nuoviPS;

            await this.sleep(6000);

            //caso in cui il pokemon che protagonista aveva appena mandato diventa esausto
            if(primaAzione[1] == "switch") {
                this.scriviTestoBattaglia(this.battVue.activePkmPrt.nome + " alleato è esausto! ", 0);
                this.battVue.animazioneRitiro(this.battVue.protagonista, "Prt");

                await this.sleep(5000);

                //caso in cui l'avversario è la CPU
                if(this.battVue.avversario.username == "CPU") {
                    var msgCPU = this.cpu.mandaAttesaCPU();
                    this.battVue.bcpc.sendBattleCPUMessage(msgCPU);
                }

                this.scriviTestoBattaglia("Scegli un pokemon da mandare in campo...", 1);
                
                await this.sleep(4000);

                this.battVue.switchForzato();
            }

            //caso in cui il pokemon che protagonista aveva appena mandato è ancora vivo
            else {  //primaAzione[1] == ""
                //caso in cui l'avversario è la CPU
                if(this.battVue.avversario.username == "CPU") {
                    var msgCPU = this.cpu.mandaAzioneCPU();
                    this.battVue.bcpc.sendBattleCPUMessage(msgCPU);
                }

                this.scriviTestoBattaglia("Scegli un'azione... ", 0);
                
                await this.sleep(2000);

                this.battVue.attivaTutto();
            }

            return;
        }

        //caso in cui avversario fa uno switch
        else if(secondaAzione[0] == "switch") {
            this.scriviTestoBattaglia(this.battVue.activePkmAvv.nome + " avversario è ritirato dal campo. ", 0);
            this.battVue.animazioneRitiro(this.battVue.avversario, "Avv");

            await this.sleep(5500);

            this.battVue.cambiaActivePkm(obj_batt.secondo.valore, this.battVue.avversario);
            this.battVue.animazioneSwitch(this.battVue.avversario, "Avv");
            this.scriviTestoBattaglia(this.battVue.activePkmAvv.nome + " avversario è mandato in campo.", 1);

            await this.sleep(5500);
        }

        //sia in caso di switch che in caso di attesa da parte dell'avversario

        //caso in cui l'avversario è la CPU
        if(this.battVue.avversario.username == "CPU") {
            var msgCPU = this.cpu.mandaAzioneCPU();
            this.battVue.bcpc.sendBattleCPUMessage(msgCPU);
        }

        this.scriviTestoBattaglia("Scegli un'azione... ", 0);
                
        await this.sleep(2000);

        this.battVue.attivaTutto();
    }


    //funzione per modularizzare gestione prima azione, da parte dell'avversario e pari a switch
    async gestisciSwitchAvv(obj_batt, primaAzione, secondaAzione) {
        //gestisco il caso del primo turno
        if(this.battVue.avversario.squadra.length == 1) {
            this.battVue.cambiaActivePkm(obj_batt.primo.valore, this.battVue.avversario);
            this.battVue.animazioneSwitch(this.battVue.avversario, "Avv");
            this.scriviTestoBattaglia(this.battVue.activePkmAvv.nome + " avversario è mandato in campo.", 0);

            await this.sleep(5500);

            this.battVue.cambiaActivePkm(obj_batt.secondo.valore, this.battVue.protagonista);
            this.battVue.animazioneSwitch(this.battVue.protagonista, "Prt");
            this.scriviTestoBattaglia(this.battVue.activePkmPrt.nome + " alleato è mandato in campo.", 0);

            await this.sleep(5500);

            //caso in cui l'avversario è la CPU
            if(this.battVue.avversario.username == "CPU") {
                var msgCPU = this.cpu.mandaAzioneCPU();
                this.battVue.bcpc.sendBattleCPUMessage(msgCPU);
            }

            this.scriviTestoBattaglia("Scegli un'azione... ", 0);
                
            await this.sleep(2000);

            this.battVue.attivaTutto();

            return;
        }

        //gestisco caso in cui switch non è forzato
        if(secondaAzione[0] != "attesa") {
            this.scriviTestoBattaglia(this.battVue.activePkmAvv.nome + " avversario è ritirato dal campo. ", 0);
            this.battVue.animazioneRitiro(this.battVue.avversario, "Avv");

            await this.sleep(5500);
        }
        else this.scriviTestoBattaglia("", 0);

        this.battVue.cambiaActivePkm(obj_batt.primo.valore, this.battVue.avversario);
        this.battVue.animazioneSwitch(this.battVue.avversario, "Avv");
        this.scriviTestoBattaglia(this.battVue.activePkmAvv.nome + " avversario è mandato in campo.", 1);

        await this.sleep(5500);

        //caso in cui protagonista usa una mossa
        if(secondaAzione[0] == "mossa") {
            var mossa = this.battVue.dammiMossa(obj_batt.secondo.valore, this.battVue.activePkmPrt);

            this.scriviTestoBattaglia(this.battVue.activePkmPrt.nome + " alleato usa " + mossa.nome + ". ", 0);
            this.battVue.animazioneBattaglia("Prt", "Avv");

            await this.sleep(5000);

            this.scriviTestoBattaglia(obj_batt.secondo.comunicato, 1);

            var nuoviPS = this.battVue.activePkmAvv.ps - obj_batt.secondo.danno;
            if(nuoviPS < 0) nuoviPS = 0;
            this.battVue.activePkmAvv.ps = nuoviPS;

            await this.sleep(6000);

            //caso in cui il pokemon che avversario aveva appena mandato diventa esausto
            if(primaAzione[1] == "switch") {
                this.scriviTestoBattaglia(this.battVue.activePkmAvv.nome + " avversario è esausto! ", 0);
                this.battVue.animazioneRitiro(this.battVue.avversario, "Avv");

                await this.sleep(5000);

                //caso in cui l'avversario è la CPU
                if(this.battVue.avversario.username == "CPU") {
                    this.cpu.attivoEsausto();
                    var msgCPU = this.cpu.mandaSwitchCPU();
                    this.battVue.bcpc.sendBattleCPUMessage(msgCPU);
                }

                this.scriviTestoBattaglia("In attesa dell'azione di " + this.battVue.avversario.username + "...", 1);

                await this.sleep(4000);
    
                this.battVue.mandaAttesa();
            }

            //caso in cui il pokemon che avversario aveva appena mandato è ancora vivo
            else {  //primaAzione[1] == ""
                //caso in cui l'avversario è la CPU
                if(this.battVue.avversario.username == "CPU") {
                    var msgCPU = this.cpu.mandaAzioneCPU();
                    this.battVue.bcpc.sendBattleCPUMessage(msgCPU);
                }

                this.scriviTestoBattaglia("Scegli un'azione... ", 0);
                
                await this.sleep(2000);

                this.battVue.attivaTutto();
            }

            return;
        }

        //caso in cui protagonista fa uno switch
        else if(secondaAzione[0] == "switch") {
            this.scriviTestoBattaglia(this.battVue.activePkmPrt.nome + " alleato è ritirato dal campo. ", 0);
            this.battVue.animazioneRitiro(this.battVue.protagonista, "Prt");

            await this.sleep(5500);

            this.battVue.cambiaActivePkm(obj_batt.secondo.valore, this.battVue.protagonista);
            this.battVue.animazioneSwitch(this.battVue.protagonista, "Prt");
            this.scriviTestoBattaglia(this.battVue.activePkmPrt.nome + " alleato è mandato in campo.", 1);

            await this.sleep(5500);
        }

        //sia in caso di switch che in caso di attesa da parte del protagonista

        //caso in cui l'avversario è la CPU
        if(this.battVue.avversario.username == "CPU") {
            var msgCPU = this.cpu.mandaAzioneCPU();
            this.battVue.bcpc.sendBattleCPUMessage(msgCPU);
        }

        this.scriviTestoBattaglia("Scegli un'azione... ", 0);

        await this.sleep(2000);

        this.battVue.attivaTutto();
    }


    //funzione per modularizzare gestione prima azione pari a forfeit
    gestisciForfeit(isPrimoPrt, secondaAzione) {
        //il protagonista ha forfeittato
        if(isPrimoPrt || secondaAzione[0] == "forfeit") {
            this.scriviTestoBattaglia("Hai forfeittato! Hai perso lo scontro!", 0);

            //reindirizzo (senza possibilità di tornare indietro) sulla schermata di sconfitta dopo 10 secondi
            setTimeout(function() { fetchEsitoPage("sconfitta"); }, 10000);
        }

        //l'avversario ha forfeittato
        else {
            this.scriviTestoBattaglia("L'avversario ha forfeittato! Hai vinto lo scontro!", 0);

            //reindirizzo (senza possibilità di tornare indietro) sulla schermata di vittoria dopo 10 secondi
            setTimeout(function() { fetchEsitoPage("vittoria"); }, 10000);
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
        if(obj_batt.primo.utente == this.battVue.protagonista.username) {
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
