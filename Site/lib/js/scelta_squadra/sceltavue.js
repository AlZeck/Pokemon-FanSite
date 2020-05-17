//oggetto vue per la scelta della squadra
var sceltaVue = new Vue({
    //id dell'element associato
    el: '#sceltaVue',

    data: {
        //l'oggetto pokemon selezionato (inizialmente defaultPkm)
        selectedPkmData: defaultPkm,

        //la squadra corrente, in posizione 0 ci sta il pokemon di default
        squadra: [defaultPkm],

        //il json della squadra completa da inviare poi al server
        squadraJSON: ""
    },

    computed: {
        //il computed per ottenere il pokemon selezionato del protagonista in base al valore del suo indice
        selectedPkm: function () {
            return this.selectedPkmData;
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


        //il computed che controlla se la squadra è stata completamente inizializzata
        squadraPronta: function () {
            if (this.squadra.length < 7) return false;

            var i;
            for (i = 1; i < 7; i++) {
                if (this.squadra[i].mosse.length < 4) return false;
            }

            return true;
        },


        //il computed che ridà la lista di tutte le mosse disponibili per il selectedPkm
        tutteMosse: function () {
            if(this.selectedPkmData.id != 0) return prendiDalDB("moveset", this.selectedPkmData.id);
            else return [];
        }
    },

    methods: {
        //metodo per cambiare il pokemon selezionato prendendolo dalla squadra in base all'indice passato e se il pokemon è noto o meno
        cambiaSelectedPkmSquadra: function (i) {
            if (i < this.squadra.length) this.selectedPkmData = this.squadra[i];
        },


        //metodo per cambiare il pokemon selezionato prendendolo dalla lista in base all'id. Se già stava in squadra lo prende da lì.
        cambiaSelectedPkm: function (id) {
            var i;
            for (i = 1; i < this.squadra.length; i++) {
                if (this.squadra[i].id == id) {
                    this.selectedPkmData = this.squadra[i];
                    return;
                }
            }

            this.selectedPkmData = prendiDalDB("pokemon", id);
        },


        //metodo per aggiungere il selectedPkm alla squadra (controlla nel dom se già c'è o squadra piena)
        aggiungiPkm: function () {
            this.squadra.push( this.selectedPkmData );
        },
        

        //metodo per togliere un pokemon tra quelli selezionati dalla squadra (in tal caso squadraJSON rivà a stringa vuota)
        rimuoviPkm: function () {
            var index = this.squadra.indexOf(this.selectedPkmData);
            if (index !== -1) this.squadra.splice(index, 1);
            this.squadraJSON = "";
        },


        //metodo per aggiungere una mossa disponibile tra quelle selezionate dal selectedPkm (controlla nel dom se moveset già pieno o mossa già c'è)
        aggiungiMossa: function (m) {
            this.selectedPkmData.mosse.push(m);
        },


        //metodo per togliere una mossa tra quelle già selezionate dal selectedPkm (in tal caso squadraJSON rivà a stringa vuota)
        rimuoviMossa: function (index) {
            this.selectedPkmData.mosse.splice(index, 1);
            this.squadraJSON = "";
        },


        //metodo che passato un oggetto json del tipo {"id": id_pkm, "mosse": [id_mossa1, id_mossa2, id_mossa3, id_mossa4]} lo converte nella squadra vera e propria
        squadraDaJson: function(json) {
            this.squadraJSON = json;
            var nuovaSquadra = [ defaultPkm ];

            var i, j;
            for (i = 0; i < 6; i++) {
                nuovaSquadra.push( prendiDalDB("pokemon", this.squadraJSON[i].id) );

                for (j = 0; j < 4; j++) {
                    nuovaSquadra[i + 1].mosse.push( prendiDalDB("mossa", this.squadraJSON[i].mosse[j]) );
                }
            }

            this.squadra = nuovaSquadra;
            this.cambiaSelectedPkmSquadra(1);
        },


        //metodo per la creazione squadra casuale (legato al bottone CASUALE)
        casuale: function () {
            this.squadraDaJson( creaSquadra() );
        },


        //metodo per confermare la squadra scelta (legato al bottone CONFERMA)
        //la salva nella local storage
        //controlla che la squadra sia pronta nel dom
        conferma: function () {
            //se ancora non si ha il JSON aggiornato
            if(this.squadraJSON == "") {
                var sjson = [];

                var i, j;
                for(i = 1; i < 7; i++) {
                    sjson.push({ "id": this.squadra[i].id, "mosse": [] });

                    for(j = 0; j < 4; j++) {
                        sjson[i-1].mosse.push(this.squadra[i].mosse[j].id);
                    }
                }

                this.squadraJSON = sjson;
            }

            localStorage.setItem("squadra", JSON.stringify(this.squadraJSON));
            window.location.assign('/battle/sfida.php');
        }
    }
});



//controlla se esiste già una squadra in local storage, se sì la carica subito
if(localStorage.getItem("squadra") != null){
    sceltaVue.squadraDaJson(JSON.parse(localStorage.getItem("squadra")));
};