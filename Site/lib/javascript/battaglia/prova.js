//modularizzo gestione mossa
    gestisciMossa() {
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


    //modularizzo gestione switch
    gestisciSwitch() {
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


    //modularizzo gestione forfeit
    gestisciForfeit() {
        if(miaAzione[0] == "forfeit") {
            //mando scritta di mio forfeit
            //mando scritta di sconfitta e reindirizzo su risultato perdente
        }

        else {  //non ho fatto forfeit
            //mando scritta di forfeit avversario
            //mando scritta di vittoria e reindirizzo su risultato vincente
        }
    }


    //modularizzo la gestione della risposta (utente1 è colui che si muove per primo)
    gestisciRisposta(azioni1, utente1, pkmAttivo1, pkmSelezionato1, azioni2, utente2, pkmAttivo2, pkmSelezionato2) {
        if(azioni1[0] == "mossa") {
            //chiamo gestisciMossa
        }

        else if(azioni1[0] == "switch") {
            //chiamo gestisciSwitch
        }

        else {  //azioni1[0] == "forfeit"
            //chiamo gestisciForfeit
        }
    }
