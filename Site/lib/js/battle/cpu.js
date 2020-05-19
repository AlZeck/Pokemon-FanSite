//classe per l'oggetto Cpu
class Cpu {
    /*  PARAMETRI
        _squadra        : array di sei oggetti pokemon del tipo {"id": id_pkm, "mosse": [id_mossa1, id_mossa2, id_mossa3, id_mossa4]}
                          esattamente come nel messaggio di inizializzazione da inviare al server

        _indexActivePkm : intero indicante l'indice del pokemon della CPU attualmente attivo

        _ancoraVivi     : array di interi contenente gli indici dei pokemon della CPU non esausti
    */


    //costruttore
    constructor() {
        this._squadra = creaSquadra();
        this._indexActivePkm = 0;
        this._ancoraVivi = [0, 1, 2, 3, 4, 5];
    }


    //getter
    get squadra() { return this._squadra; }
    get indexActivePkm() { return this._indexActivePkm; }
    get ancoraVivi() { return this._ancoraVivi; }


    //funzione per rimuovere il pokemon attivo esausto dalla lista degli ancora vivi
    attivoEsausto() {
        var index = this.ancoraVivi.indexOf(this.indexActivePkm);
        if(index > -1) this.ancoraVivi.splice(index, 1);
    }


    //funzione per fare un'attesa e restituire il json (che poi verrà gestito ed inviato dalla battaglia col bcpc del vue)
    mandaAttesaCPU() {
        return {
            "utente": "CPU",
            "azione": "attesa",
            "valore": 0
        };
    }


    //funzione per fare uno switch e restituire il json (che poi verrà gestito ed inviato dalla battaglia col bcpc del vue)
    mandaSwitchCPU() {
        do {
            var randIdx = Math.floor(Math.random() * this.ancoraVivi.length);
            var rand = this.ancoraVivi[randIdx];
        } while(this.indexActivePkm == rand);
        this._indexActivePkm = rand;

        return {
            "utente": "CPU",
            "azione": "switch",
            "valore": this.squadra[rand].id
        };
    }

    
    //funzione per decidere che cosa fare e restituire il json (che poi verrà gestito ed inviato dalla battaglia col bcpc del vue)
    mandaAzioneCPU() {
        var rand = Math.floor(Math.random() * 10);

        if(rand >= 8 && this.ancoraVivi.length > 1) {
            //usa uno switch
            return this.mandaSwitchCPU();
        }

        else {
            //usa una mossa
            rand = Math.floor(Math.random() * 4);

            return {
                "utente": "CPU",
                "azione": "mossa",
                "valore": this.squadra[this.indexActivePkm].mosse[rand]
            };
        }    
    }
}
