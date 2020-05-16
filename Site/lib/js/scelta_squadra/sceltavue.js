//per caricare l'oggetto vue con le sue informazioni al caricamento della pagina
window.addEventListener("load", function() {

    //oggetto vue per le informazioni del gioco
    var sceltaVueObj = {
        //id dell'element associato
        el: '#sceltaVue',

        data: {
            //l'oggetto pokemon selezionato (inizialmente 0)
            selectedPkm: defaultPkm,

            //la squadra corrente, in posizione 0 ci sta il pokemon di default
            squadra: [ defaultPkm ]
        },

        computed: {
            //il computed per ottenere il pokemon selezionato del protagonista in base al valore del suo indice
            selectedPkm: function() {
                if(this.indexSelectedPkm < 7) return this.squadra[this.indexSelectedPkm];
                else return this.squadra[0];
            },


            //il computed per ottenere il primo pokemon della squadra
            primoPkm: function() {
                if(this.squadra.length >= 2) return this.squadra[1];
                else return this.squadra[0];
            },


            //il computed per ottenere il primo pokemon della squadra
            secondoPkm: function() {
                if(this.squadra.length >= 3) return this.squadra[2];
                else return this.squadra[0];
            },


            //il computed per ottenere il primo pokemon della squadra
            terzoPkm: function() {
                if(this.squadra.length >= 4) return this.squadra[3];
                else return this.squadra[0];
            },


            //il computed per ottenere il primo pokemon della squadra
            quartoPkm: function() {
                if(this.squadra.length >= 5) return this.squadra[4];
                else return this.squadra[0];
            },


            //il computed per ottenere il primo pokemon della squadra
            quintoPkm: function() {
                if(this.squadra.length >= 6) return this.squadra[5];
                else return this.squadra[0];
            },


            //il computed per ottenere il primo pokemon della squadra
            sestoPkm: function() {
                if(this.squadra.length >= 7) return this.squadra[6];
                else return this.squadra[0];
            }
        },

        methods: {
            //metodo per cambiare il pokemon selezionato dell'allenatore in base all'indice passato e se il pokemon è noto o meno
            cambiaSelectedPkm: function(i) {
                if(i < this.squadra.length) this.indexSelectedPkm = i;
            },


            /*
                fare un metodo per premuto exit (se ci sta da chiudere degli oggetti aperti magari?)

                fare un metodo per premuto su random (chiama creazione squadra casuale)

                fare un metodo per premuto su conferma (crea bcpc e battaglia)

                fare un metodo che cliccando su una delle card e sinistra diventa pokemon selezionato

                fare un metodo che se si sta su un selezionato che sta già in squadra si può togliere dalla squadra

                fare un metodo che cliccando su una delle mosse disponibili nella card del selezionato si può aggiungere alle mosse scelte

                fare un metodo che si può togliere una delle mosse scelte del pokemon selezionato
            */
        }
    };



    //istanzio nuovo oggetto Vue
    sceltaVue = new Vue(sceltaVueObj);
});



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
