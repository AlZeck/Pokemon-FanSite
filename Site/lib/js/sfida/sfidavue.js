//oggetto vue per la sfida
sfidaVue = new Vue({
    //id dell'element associato
    el: '#sfidaVue',

    data: {
        //array degli utenti da visualizzare pronti ad essere sfidati (inizialmente c'è solo la CPU)
        utentiData: [ defaultCpu ]
    },

    computed: {
        //computed che mostra l'array degli utenti
        utenti: function() {
            return this.utentiData;
        }
    },

    methods: {
        //metodo per aggiungere un utente ad un array dato (associandoci uno sprite casuale)
        inserisciUtente: function(array, usrnm) {
            array.push({
                username:   usrnm,
                sprite:     "/assets/img/allenatori/" + (Math.floor(Math.random() * 87) + 1) + ".png"
            });
        },


        //metodo per rimuovere un utente da un array dato
        rimuoviUtente: function(array, usrnm) {
            var i;
            for(i=0; i<array.length; i++) {
                if(array[i].username == usrnm) {
                    array.splice(i, 1);
                    return;
                }
            }
        },


        //metodo che risistema l'array degli utentiData in base all'array di username passati
        aggiornaUtenti: function(array) {
            var nuoviUtentiData = [ defaultCpu ];

            var i, j, f;
            for(i=0; i<array.length; i++) {
                f = true;

                for(j=1; j<this.utentiData.length; j++) {
                    if(this.utentiData[j].username == array[i]) {
                        nuoviUtentiData.push(this.utentiData[j]);
                        f = false;
                        break;
                    }
                }

                if(f) this.inserisciUtente(nuoviUtentiData, array[i]);
            }

            this.utentiData = nuoviUtentiData;     
        }
    }
});
