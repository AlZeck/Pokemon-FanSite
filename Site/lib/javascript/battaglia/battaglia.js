//classe per l'oggetto Battaglia
class Battaglia {
    /*  PARAMETRI
        _io                 : oggetto Utente
        _avversario         : oggetto Utente

        _mioPkmAttivo       : oggetto Pokemon
        _suoPkmAttivo       : oggetto Pokemon

        _mioPkmSelezionato  : oggetto Pokemon
        _suoPkmSelezionato  : oggetto Pokemon
    */


    //costruttore
    constructor(io_username, pkm1, pkm2, pkm3, pkm4, pkm5, pkm6, avversario_username) {
        this._io = new Utente(io_username, pkm1, pkm2, pkm3, pkm4, pkm5, pkm6);
        this._avversario = new Utente(avversario_username, null, null, null, null, null, null);

        this._mioPkmAttivo = pkm1;
        this._suoPkmAttivo = null;

        this._mioPkmSelezionato = pkm1;
        this._suoPkmSelezionato = null;
    }


    //getter
    get io() { return this._io; }
    get avversario() { return this._avversario; }
    get mioPkmAttivo() { return this._mioPkmAttivo; }
    get suoPkmAttivo() { return this._suoPkmAttivo; }
    get mioPkmSelezionato() { return this._mioPkmSelezionato; }
    get suoPkmSelezionato() { return this._suoPkmSelezionato; }


    //setter
    set mioPkmAttivo(x) { this._mioPkmAttivo = x; }
    set suoPkmAttivo(x) { this._suoPkmAttivo = x; }
    set mioPkmSelezionato(x) { this._mioPkmSelezionato = x; }
    set suoPkmSelezionato(x) { this._suoPkmSelezionato = x; }


    //funzione che gestisce la battaglia lato client in base a messaggi che gli arrivano e restituisce stringa json di risposta
    generaRisposta(mess_batt) {
        //ricavo l'oggetto json
        obj_batt = JSON.parse(mess_batt);

        //il primo a muoversi sono io
        if(obj_batt.primo.utente == this._io.username) {
            miaAzione = obj_batt.primo.azione.split("_");
            suaAzione = obj_batt.secondo.azione.split("_");

            if(miaAzione[0] == "mossa") {
                //uso la mossa, faccio animazione e cambio la gui (ps e scritta)

                if(miaAzione[1] == "vinto") {
                    //mando scritta di pokemon avversario esausto
                    //mando scritta di vittoria e reindirizzo su risultato vincente
                }

                else if(miaAzione[1] == "attesa") {
                    //mando scritta di pokemon avversario esausto
                    //mando messaggio di attesa a server e scritta di attesa su gui
                }

                //avversario usa la mossa (per forza), fa animazione e cambia gui (ps e scritta)

                if(miaAzione[1] == "perso") {
                    //mando scritta di pokemon mio esausto
                    //mando scritta di sconfitta e reindirizzo su risultato perdente
                }

                else if(miaAzione[1] == "switch") {
                    //mando scritta di pokemon mio esausto
                    //mando scritta di scegliere pokemon e lo costringo a sceglierne uno (altri bottoni disabilitati) e poi mando messaggio switch
                }

                else {  //miaAzione[1] == "" (stringa vuota)
                    //mando scritta di scegliere cosa fare
                    //mando messaggio apposito al server dopo
                }
            }

            else if(miaAzione[0] == "switch") {
                //faccio il cambio, faccio animazione e cambio la gui (ps e scritta e miaArea)

                if(suaAzione[0] == "mossa") {
                    //avversario usa la mossa, fa animazione e cambia gui (ps e scritta)

                    if(miaAzione[1] == "switch") {
                        //mando scritta di pokemon mio esausto
                        //mando scritta di scegliere pokemon e lo costringo a sceglierne uno (altri bottoni disabilitati) e poi mando messaggio switch
                    }

                    else {  //miaAzione[1] == ""
                        //mando scritta di scegliere cosa fare
                        //mando messaggio apposito al server dopo
                    }
                }

                else if(suaAzione[0] == "switch") {
                    //fa il cambio, fa animazione e cambia la gui (ps e scritta e suaArea)
                    //mando scritta di scegliere cosa fare
                    //mando messaggio apposito al server dopo
                }

                else {  //suaAzione[0] == "attesa"
                    //avversario non fa niente
                    //mando scritta di scegliere cosa fare
                    //mando messaggio apposito al server dopo
                }
            }

            else {  //miaAzione[0] == "forfeit"
                //mando scritta di mio forfeit
                //mando scritta di sconfitta e reindirizzo su risultato perdente
            }            
        }


        //il primo a muoversi è l'avversario
        else {
            miaAzione = obj_batt.secondo.azione.split("_");
            suaAzione = obj_batt.primo.azione.split("_");

            if(suaAzione[0] == "mossa") {
                //avversario usa la mossa, fa animazione e cambia la gui (ps e scritta)

                if(suaAzione[1] == "vinto") {
                    //mando scritta di pokemon mio esausto
                    //mando scritta di sconfitta e reindirizzo su risultato perdente
                }

                else if(suaAzione[1] == "attesa") {
                    //mando scritta di pokemon mio esausto
                    //mando scritta di scegliere pokemon e lo costringo a sceglierne uno (altri bottoni disabilitati) e poi mando messaggio switch
                }

                //uso la mossa (per forza), faccio animazione e cambio la gui (ps e scritta)

                if(suaAzione[1] == "perso") {
                    //mando scritta di pokemon avversario esausto
                    //mando scritta di vittoria e reindirizzo su risultato vincente
                }

                else if(suaAzione[1] == "switch") {
                    //mando scritta di pokemon avversario esausto
                    //mando messaggio di attesa a server e scritta di attesa su gui
                }

                else {  //suaAzione[1] == "" (stringa vuota)
                    //mando scritta di scegliere cosa fare
                    //mando messaggio apposito al server dopo
                }
            }

            else if(suaAzione[0] == "switch") {
                //fa il cambio, fa animazione e cambia la gui (ps e scritta e suaArea)

                if(miaAzione[0] == "mossa") {
                    //uso la mossa, faccio animazione e cambio la gui (ps e scritta)

                    if(suaAzione[1] == "switch") {
                        //mando scritta di pokemon avversario esausto
                        //mando messaggio di attesa a server e scritta di attesa su gui
                    }

                    else {  //suaAzione[1] == ""
                        //mando scritta di scegliere cosa fare
                        //mando messaggio apposito al server dopo
                    }
                }

                else if(miaAzione[0] == "switch") {
                    //faccio il cambio, faccio animazione e cambio la gui (ps e scritta e miaArea)
                    //mando scritta di scegliere cosa fare
                    //mando messaggio apposito al server dopo
                }

                else {  //miaAzione[0] == "attesa"
                    //non faccio niente
                    //mando scritta di scegliere cosa fare
                    //mando messaggio apposito al server dopo
                }
            }

            else {  //suaAzione[0] == "forfeit"
                if(miaAzione[0] == "forfeit") {
                    //mando scritta di mio forfeit
                    //mando scritta di sconfitta e reindirizzo su risultato perdente
                }

                else {  //non ho fatto forfeit
                    //mando scritta di forfeit avversario
                    //mando scritta di vittoria e reindirizzo su risultato vincente
                }
            }
        }
    }

}
