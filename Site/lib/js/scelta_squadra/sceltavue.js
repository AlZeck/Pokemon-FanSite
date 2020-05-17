//variabile per poterlo usare al di fuori
var sceltaVue;

//un oggetto pokemon di default
var defaultPkm = {
    id: 0,
    nome: "???",
    tipo1: "sconosciuto",
    tipo2: null,
    uber: false,
    psMax: 1,
    ps: 0,
    att: 0,
    dif: 0,
    atts: 0,
    difs: 0,
    vel: 0,
    mini_sprite: "/assets/pokemon/default_sprites/default_mini.png",
    artwork: "/assets/pokemon/default_sprites/default_front_back.png",
    mosse: []
}

//per caricare l'oggetto vue con le sue informazioni al caricamento della pagina
//window.addEventListener("load", function() {

//oggetto vue per le informazioni del gioco
var sceltaVueObj = {
    //id dell'element associato
    el: '#sceltaVue',

    data: {
        //l'oggetto pokemon selezionato (inizialmente defaultPkm)
        selectedPkm: defaultPkm,

        //la squadra corrente, in posizione 0 ci sta il pokemon di default
        squadra: [defaultPkm],

        //il json della squadra completa da inviare poi al server (casuale lo inizializza subito)
        squadraJSON: ""
    },

    computed: {
        //il computed per ottenere il pokemon selezionato del protagonista in base al valore del suo indice
        selectedPkm: function () {
            return this.selectedPkm;
        },


        //il computed per ottenere il primo pokemon della squadra
        primoPkm: function () {
            if (this.squadra.length >= 2) return this.squadra[1];
            else return this.squadra[0];
        },


        //il computed per ottenere il primo pokemon della squadra
        secondoPkm: function () {
            if (this.squadra.length >= 3) return this.squadra[2];
            else return this.squadra[0];
        },


        //il computed per ottenere il primo pokemon della squadra
        terzoPkm: function () {
            if (this.squadra.length >= 4) return this.squadra[3];
            else return this.squadra[0];
        },


        //il computed per ottenere il primo pokemon della squadra
        quartoPkm: function () {
            if (this.squadra.length >= 5) return this.squadra[4];
            else return this.squadra[0];
        },


        //il computed per ottenere il primo pokemon della squadra
        quintoPkm: function () {
            if (this.squadra.length >= 6) return this.squadra[5];
            else return this.squadra[0];
        },


        //il computed per ottenere il primo pokemon della squadra
        sestoPkm: function () {
            if (this.squadra.length >= 7) return this.squadra[6];
            else return this.squadra[0];
        },


        //metodo che controlla se la squadra è stata completamente inizializzata
        squadraPronta() {
            if (this.squadra.length < 7) return false;

            var i;
            for (i = 1; i < 7; i++) {
                if (this.squadra[i].mosse.length < 4) return false;
            }

            return true;
        },
    },

    methods: {
        //metodo per cambiare il pokemon selezionato dell'allenatore in base all'indice passato e se il pokemon è noto o meno
        cambiaSelectedPkmSquadra: function (i) {
            if (i < this.squadra.length) this.selectedPkm = this.squadra[i];
        },


        //metodo chiamato premendo il pulsante di creazione squadra casuale
        casuale: function () {
            this.squadraJSON = creaSquadra();

            var nuovaSquadra = [defaultPkm];

            var i, j;
            for (i = 0; i < 6; i++) {
                nuovaSquadra.push(prendiDalDB("pokemon", this.squadraJSON[i].id));

                for (j = 0; j < 4; j++) {
                    nuovaSquadra[i + 1].mosse.push(prendiDalDB("mossa", this.squadraJSON[i].mosse[j]));
                }
            }

            this.squadra = nuovaSquadra;
            this.cambiaSelectedPkmSquadra(1);
        },


        //DA MODIFICARE: deve creare il battVue, bcpcontroller e inizializzare la battaglia e reindirizzare nella pagina apposita se ha successo
        //metodo chiamato premendo il pulsante di conferma
        conferma: function () {
            //non hai la squadra ancora pronta
            if (!this.squadraPronta) {
                //testing
                console.log("NO");
            }

            else {
                if (this.squadraJSON == "") {
                    var sjson = [];

                    var i, j;
                    for (i = 1; i < 7; i++) {
                        sjson.push({ "id": this.squadra[i].id, "mosse": [] });

                        for (j = 0; j < 4; j++) {
                            sjson[i - 1].mosse.push(this.squadra[i].mosse[j].id);
                        }
                    }

                    this.squadraJSON = sjson;
                }

                //testing
                console.log(this.squadraJSON);
            }
        },


        //metodo che mette il pokemon selezionato come quello selezionato (appena si ha bottone renderlo disabled se squadra.includes(selectedPkm))
        selezionaPkm: function (id) {
            var i;
            for (i = 1; i < this.squadra.length; i++) {
                if (this.squadra[i].id == id) {
                    this.selectedPkm = this.squadra[i];
                    return;
                }
            }

            this.selectedPkm = prendiDalDB("pokemon", id);
        }

    /*
        fare un metodo che se si sta su un selezionato che sta già in squadra si può togliere dalla squadra

        fare un metodo che cliccando su una delle mosse disponibili nella card del selezionato si può aggiungere alle mosse scelte

        fare un metodo che si può togliere una delle mosse scelte del pokemon selezionato
    */
}
};



//istanzio nuovo oggetto Vue
sceltaVue = new Vue(sceltaVueObj);
//});
