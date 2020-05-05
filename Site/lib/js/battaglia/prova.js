var A = new Array("bulbasaur", "ivysaur", "venusaur", "charmander", "charmaleon", "charizard");

var mioPkm = Vue.component( 'MIOPKM', {
    data: {
        mini_sprite = "../../../assets/pokemon/null/null_mini.png",   //sprite null di default
        
        nome = "???"
    },

    template: `
        <DIV v−on:click="mioSeleziona">
            <IMG v−bind:src="mini_sprite">
            {{ nome }}
        </DIV>
    `,

    methods: {
        mioSeleziona: function() {
            this.$emit('mio-seleziona');
        }
    }
});


var miaArea = new Vue({
    el: '.mia-class',

    computed: {
        squadra:[
            { id: 1, nome: "bulbasaur" },
            { id: 2, nome: "ivysaur" },
            { id: 3, nome: "venusaur" },
            { id: 4, nome: "charmander" },
            { id: 5, nome: "charmaleon" },
            { id: 6, nome: "charizard" }
        ]
    },

    methods: {
        aggiornaMiaArea: function() {
            document.getElementById("miaArea").innerHTML = "<H1>" + this.squadra[0].id + " - " + this.squadra[0].nome + "</H1>";
        }
    }
})
