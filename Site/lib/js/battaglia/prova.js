window.addEventListener("load", function() {

/*
    var mioPkm = Vue.component( 'MIOPKM', {
        data: {
            mini_sprite = "../../../assets/pokemon/null/null_mini.png",   //sprite null di default
            
            nome = "???"
        },

        template: `
            <DIV v-on:click="mioSeleziona">
                <IMG v-bind:src="mini_sprite">
                {{ nome }}
            </DIV>
        `,

        methods: {
            mioSeleziona: function() {
                this.$emit('mio-seleziona');
            }
        }
    });
*/

//id,nome,tipo1,tipo2,ps,att,dif,attsp,difsp,vel,mossa1-2-3-4


var protag = new Vue({
    el: '#protagonista',

    data: {
        indexActivePkm: 0,

        indexSelectedPkm: 0,

        default: {id: 0, nome: "???", tipo1: null, tipo2: null, ps: 0, att: 0, dif: 0, atts: 0, difs: 0, vel: 0, 
                    mini_sprite: "../../../assets/pokemon/null/null_mini.png",
                    front_sprite: "../../../assets/pokemon/null/null_front_back.png",
                    back_sprite: "../../../assets/pokemon/null/null_front_back.png"
                 },
        

        squadra: [   
            {id: 1, nome: "bulbasaur", tipo1: null, tipo2: null, ps: 0, att: 0, dif: 0, atts: 0, difs: 0, vel: 0, 
                mini_sprite: "../../../assets/pokemon/mini_sprite/bulbasaur.png",
                front_sprite: "../../../assets/pokemon/front_sprite/bulbasaur.gif",
                back_sprite: "../../../assets/pokemon/back_sprite/bulbasaur.gif"
            },

            {id: 2, nome: "ivysaur", tipo1: null, tipo2: null, ps: 0, att: 0, dif: 0, atts: 0, difs: 0, vel: 0, 
                mini_sprite: "../../../assets/pokemon/mini_sprite/ivysaur.png",
                front_sprite: "../../../assets/pokemon/front_sprite/ivysaur.gif",
                back_sprite: "../../../assets/pokemon/back_sprite/ivysaur.gif"
            },

            {id: 0, nome: "???", tipo1: null, tipo2: null, ps: 0, att: 0, dif: 0, atts: 0, difs: 0, vel: 0, 
                    mini_sprite: "../../../assets/pokemon/null/null_mini.png",
                    front_sprite: "../../../assets/pokemon/null/null_front_back.png",
                    back_sprite: "../../../assets/pokemon/null/null_front_back.png"
                 }

            /*
            {id: 3, nome: "venusaur", tipo1: "erba", tipo2: "veleno", ps: 0, att: 0, dif: 0, atts: 0, difs: 0, vel: 0, 
                mini_sprite: "../../../assets/pokemon/mini_sprite/venusaur.png",
                front_sprite: "../../../assets/pokemon/front_sprite/venusaur.gif",
                back_sprite: "../../../assets/pokemon/back_sprite/venusaur.gif"
            }
            */
        ]
        
        
    },

    computed: {
        activePkm: function() {
            return this.squadra[this.indexActivePkm];
        },

        selectedPkm: function() {
            return this.squadra[this.indexSelectedPkm];
        },

        defaultPkm: function() {
            return this.default;
        },

        primoPkm: function() {
            return this.squadra[0];
        },

        secondoPkm: function() {
            return this.squadra[1];
        },

        terzoPkm: function() {
            return this.squadra[2];
        }
    },

    methods: {
        psMenoUno: function() {
            this.activePkm.ps --;
        },

        cambiaActivePkm: function() {
            this.indexActivePkm = this.indexSelectedPkm;
        },

        cambiaSelectedPkm: function(i) {
            this.indexSelectedPkm = i;
        },

        
        aggiungiPkm: function() {
            for(i=0; i<this.squadra.length; i++) {
                window.alert(this.squadra[i].nome);

                if(this.squadra[i].id == 0) {
                    this.squadra[i] =
                        {id: 4, nome: "charmander", tipo1: "fuoco", tipo2: null, ps: 0, att: 0, dif: 0, atts: 0, difs: 0, vel: 0, 
                        mini_sprite: "../../../assets/pokemon/mini_sprite/charmander.png",
                        front_sprite: "../../../assets/pokemon/front_sprite/charmander.gif",
                        back_sprite: "../../../assets/pokemon/back_sprite/charmander.gif"};

                    window.alert(this.squadra[i].nome);

                    //this.$emit('aggiorna-squadra');

                    break;
                }
            }
        }

    }
});

});
