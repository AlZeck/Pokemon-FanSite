//classe per l'oggetto Cpu
class Cpu {
    /*  PARAMETRI
        _squadra        : array di sei oggetti pokemon del tipo {"id": id_pkm, "mosse": [id_mossa1, id_mossa2, id_mossa3, id_mossa4]}
                          esattamente come nel messaggio di inizializzazione da inviare al server

        _numeroUber     : intero indicante quanti uber la CPU ha in squadra

        _indexActivePkm : intero indicante l'indice del pokemon della CPU attualmente attivo

        _ancoraVivi     : array di interi contenente gli indici dei pokemon della CPU non esausti
    */


    //costruttore
    constructor() {
        //FARE UN ASYNC AWAIT CHE NON AZIONA LA FUNZIONE FINALE FINCHÈ NON HA FATTO LE QUATTRO PRECEDENTI

        this._squadra = [];
        this._numeroUber = 0;
        this._indexActivePkm = 0;
        this._ancoraVivi = [0, 1, 2, 3, 4, 5];

        this.creaSquadraCPU();
    }


    //getter
    get squadra() { return this._squadra; }
    get numeroUber() { return this._numeroUber; }
    get indexActivePkm() { return this._indexActivePkm; }
    get ancoraVivi() { return this._ancoraVivi; }


    //funzione per controllare che il pokemon non ci sia già
    pkmAlreadyHere(id) {
        var i;
        for(i=0; i<this.squadra.length; i++) if(id == this.squadra[i].id) return true;
        return false;
    }


    //funzione per controllare che la mossa del pokemon passato non ci sia già
    mossaAlreadyHere(id, pkm) {
        if(pkm.mosse.includes(id)) return true;
        else return false;
    }


    //funzione per prendere un pokemon dato l'id dal db (undefined se si sfora limite uber)
    prendiPkmCPU(id) {
        var ret = undefined;

        $.ajax({
            url: "/lib/php/battleInfo.php?type=pokemon&id=" + id,
            async: false,
            dataType: 'json',
            success: function (response) {
                //console.log(response.uber.toString() + " --- is false? " + (response.uber==false).toString());

                //controlla che non ci siano più di due uber
                if(! (response.uber && this.numeroUber > 1)) {
                    if(response.uber) this.numeroUber += 1;

                    ret = {
                        id: parseInt(response.id),
                        mosse: []
                    };   
                }
            }
        });
    
        return ret;
    }


    //funzione per prendere una mossa dal db dato l'id suo e del pokemon di appartenenza
    prendiMossaCPU(mossa, pkm) {
        /*
        var ret = undefined;

        $.ajax({
            url: "/lib/php/battleInfo.php?type=mossa&id=" + id,
            async: false,
            dataType: 'json',
            success: function (response) {
                ret = parseInt(response.id);
            }
        });
    
        return ret;
        */
    }


    //funzione per creare casualmente la squadra con le mosse (non più di 2 uber e tutti diversi e mosse diverse per pokemon)
    creaSquadraCPU() {
        var i;
        for(i=0; i<6; i++) {
            var P = undefined;
            var rand;

            //prendo il pokemon
            do {
                rand = Math.floor(Math.random() * 649) + 1;     //prendo un id di un pokemon da 1 a 649
                P = this.prendiPkmCPU(rand);
            } while(this.pkmAlreadyHere(rand) || P == undefined);

            //FARE UN ASYNC AWAIT CHE NON AZIONA PRESA DELLE MOSSE FINCHÈ NON HA PRESO POKEMON

            //prendo le quattro mosse del pokemon
            var j;
            for(j=0; j<4; j++) {
                //prendo tra quelle disponibili per P 4 mosse tutte diverse
            }

            //FARE UN ASYNC AWAIT CHE NON PUSHA POKEMON FINCHÈ NON HA PRESO TUTTO QUANTO SOPRA
            
            //aggiungo elemento alla squadra
            this.squadra.push(P);
        }
    }


    //funzione per rimuovere il pokemon attivo esausto dalla lista degli ancora vivi
    attivoEsausto() {
        var index = this.ancoraVivi.indexOf(this.indexActivePkm);
        if(index > -1) this.ancoraVivi.splice(index, 1);
    }


    //funzione per fare uno switch e restituire il json (che poi verrà gestito ed inviato dalla battaglia col bcpc del vue)
    mandaSwitchCPU() {
        var rand;
        do {
            var randIdx = Math.floor(Math.random() * this.ancoraVivi.length);
            rand = this.ancoraVivi[randIdx];
        } while(rand == this.indexActivePkm);

        return {
            "utente": "CPU",
            "azione": "switch",
            "valore": this.squadra[rand]
        };
    }

    
    //funzione per decidere che cosa fare e restituire il json (che poi verrà gestito ed inviato dalla battaglia col bcpc del vue)
    mandaAzioneCPU() {
        var rand = Math.floor(Math.random() * 10);

        if(rand >= 8) {
            //usa uno switch
            if(this.ancoraVivi.length > 1) return this.mandaSwitchCPU();
        }
        
        //usa una mossa
        rand = Math.floor(Math.random() * 4);

        return {
            "utente": "CPU",
            "azione": "mossa",
            "valore": this.squadra[this.indexActivePkm].mosse[rand]
        };
    }
}
