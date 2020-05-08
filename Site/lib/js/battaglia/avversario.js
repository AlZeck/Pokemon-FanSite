window.addEventListener("load", function() {

    //oggetto vue per le informazioni del giocatore avversario
    var avver = new Vue({
        //id dell'element associato
        el: '#avversario',
    
        data: {
            //campo per lo username (che funge da chiave) del giocatore (inizialmente stringa vuota)
            username: "",

            //index della squadra per il pokemon attivo (inizialmente 0)
            indexActivePkm: 0,
    
            //index della squadra per il pokemon selezionato (inizialmente 0)
            indexSelectedPkm: 0,
    
            //la squadra corrente, in posizione 0 ci sta il pokemon di default, ma nel caso del protagonista viene subito inizializzata tutta ai pokemon scelti
            squadra: [  
                {
                    id: 0, nome: "???", tipo1: "???", tipo2: null, ps: 0, att: 0, dif: 0, atts: 0, difs: 0, vel: 0, 
                    mini_sprite: "../../../assets/pokemon/default_sprites/default_mini.png",
                    front_sprite: "../../../assets/pokemon/default_sprites/default_front_back.png",
                    back_sprite: "../../../assets/pokemon/default_sprites/default_front_back.png",
                    mosse: [
                        {id:-1, nome: "???", tipo:"???", potenza:0, precisione:0, categoria: "???"},
                        {id:-2, nome: "???", tipo:"???", potenza:0, precisione:0, categoria: "???"},
                        {id:-3, nome: "???", tipo:"???", potenza:0, precisione:0, categoria: "???"},
                        {id:-4, nome: "???", tipo:"???", potenza:0, precisione:0, categoria: "???"}
                    ]
                }
            ]
        },
    
        computed: {
            //il computed per ottenere il pokemon attivo in base al valore del suo indice
            activePkm: function() {
                if(this.indexActivePkm < 7) return this.squadra[this.indexActivePkm];
                else return this.squadra[0];
            },
    
            //il computed per ottenere il pokemon selezionato in base al valore del suo indice
            selectedPkm: function() {
                if(this.indexSelectedPkm < 7) return this.squadra[this.indexSelectedPkm];
                else return this.squadra[0];
            },
    
            //il computed per ottenere il primo pokemon della squadra se c'è o quello di default
            primoPkm: function() {
                if(this.squadra.length >= 2) return this.squadra[1];
                else return this.squadra[0];
            },
    
            //il computed per ottenere il secondo pokemon della squadra se c'è o quello di default
            secondoPkm: function() {
                if(this.squadra.length >= 3) return this.squadra[2];
                else return this.squadra[0];
            },
    
            //il computed per ottenere il terzo pokemon della squadra se c'è o quello di default
            terzoPkm: function() {
                if(this.squadra.length >= 4) return this.squadra[3];
                else return this.squadra[0];
            },
    
            //il computed per ottenere il quarto pokemon della squadra se c'è o quello di default
            quartoPkm: function() {
                if(this.squadra.length >= 5) return this.squadra[4];
                else return this.squadra[0];
            },
    
            //il computed per ottenere il quinto pokemon della squadra se c'è o quello di default
            quintoPkm: function() {
                if(this.squadra.length >= 6) return this.squadra[5];
                else return this.squadra[0];
            },
    
            //il computed per ottenere il sesto pokemon della squadra se c'è o quello di default
            sestoPkm: function() {
                if(this.squadra.length >= 7) return this.squadra[6];
                else return this.squadra[0];
            }
        },
    
        methods: {
            //metodo per cambiare il pokemon selezionato in base all'indice passato e se il pokemon è noto o meno
            cambiaSelectedPkm: function(i) {
                if(i < this.squadra.length) this.indexSelectedPkm = i;
            },

            //metodo per cambiare il pokemon attivo in base a quello selezionato (controllo se esausto già fatto)
            cambiaActivePkm: function() {
                this.indexActivePkm = this.indexSelectedPkm;
            },
    
            //metodo per aggiungere un oggetto pokemon passato se c'è spazio in squadra, se è il primo è settato automaticamente a selezionato ed attivo
            aggiungiPkm: function(pkm) {
                if(this.squadra.length < 7) {
                    this.squadra.push(pkm);
    
                    if(this.squadra.length == 2) {
                        this.indexSelectedPkm = 1;
                        this.indexActivePkm = 1;
                    }
                }
            },
    
            //metodo per aggiungere una mossa al pokemon passato se c'è spazio nel suo moveset
            aggiungiMossa: function(mossa, pkm) {    
                if(pkm.mosse.length < 4) {
                    pkm.mosse.push(mossa);
                }
            }
        }
    });

    //------------------------------------------------------------------------------------------

    var bulbasaur = {
        id: 1, nome: "bulbasaur", tipo1: "erba", tipo2: "veleno", ps: 45, att: 49, dif: 49, atts: 65, difs: 65, vel: 45, 
        mini_sprite: "../../../assets/pokemon/mini_sprite/bulbasaur.png",
        front_sprite: "../../../assets/pokemon/front_sprite/bulbasaur.gif",
        back_sprite: "../../../assets/pokemon/back_sprite/bulbasaur.gif",
        mosse: [
            {id:28, nome: "azione", tipo:"normale", potenza:40, precisione:100, categoria: "fisico"},
            {id:13, nome: "taglio", tipo:"normale", potenza:50, precisione:95, categoria: "fisico"},
            {id:19, nome: "frustata", tipo:"erba", potenza:45, precisione:100, categoria: "fisico"},
            {id:58, nome: "petalodanza", tipo:"erba", potenza:120, precisione:100, categoria: "speciale"}
        ]
    };

    var ivysaur = {
        id: 2, nome: "ivysaur", tipo1: "erba", tipo2: "veleno", ps: 60, att: 62, dif: 63, atts: 80, difs: 80, vel: 60, 
        mini_sprite: "../../../assets/pokemon/mini_sprite/ivysaur.png",
        front_sprite: "../../../assets/pokemon/front_sprite/ivysaur.gif",
        back_sprite: "../../../assets/pokemon/back_sprite/ivysaur.gif",
        mosse: [
            {id:28, nome: "azione", tipo:"normale", potenza:40, precisione:100, categoria: "fisico"},
            {id:13, nome: "taglio", tipo:"normale", potenza:50, precisione:95, categoria: "fisico"},
            {id:19, nome: "frustata", tipo:"erba", potenza:45, precisione:100, categoria: "fisico"},
            {id:58, nome: "petalodanza", tipo:"erba", potenza:120, precisione:100, categoria: "speciale"}
        ]
    };

    var venusaur = {
        id: 3, nome: "venusaur", tipo1: "erba", tipo2: "veleno", ps: 80, att: 82, dif: 83, atts: 100, difs: 100, vel: 80, 
        mini_sprite: "../../../assets/pokemon/mini_sprite/venusaur.png",
        front_sprite: "../../../assets/pokemon/front_sprite/venusaur.gif",
        back_sprite: "../../../assets/pokemon/back_sprite/venusaur.gif",
        mosse: [
            {id:28, nome: "azione", tipo:"normale", potenza:40, precisione:100, categoria: "fisico"},
            {id:13, nome: "taglio", tipo:"normale", potenza:50, precisione:95, categoria: "fisico"},
            {id:19, nome: "frustata", tipo:"erba", potenza:45, precisione:100, categoria: "fisico"},
            {id:58, nome: "petalodanza", tipo:"erba", potenza:120, precisione:100, categoria: "speciale"}
        ]
    };

    var charmander = {
        id: 4, nome: "charmander", tipo1: "fuoco", tipo2: null, ps: 39, att: 52, dif: 43, atts: 60, difs: 50, vel: 65, 
        mini_sprite: "../../../assets/pokemon/mini_sprite/charmander.png",
        front_sprite: "../../../assets/pokemon/front_sprite/charmander.gif",
        back_sprite: "../../../assets/pokemon/back_sprite/charmander.gif",
        mosse: [
            {id:10, nome: "graffio", tipo:"normale", potenza:40, precisione:100, categoria: "fisico"},
            {id:13, nome: "taglio", tipo:"normale", potenza:50, precisione:95, categoria: "fisico"},
            {id:7, nome: "fuocopugno", tipo:"fuoco", potenza:75, precisione:100, categoria: "fisico"},
            {id:40, nome: "lanciafiamme", tipo:"fuoco", potenza:90, precisione:100, categoria: "speciale"}
        ]
    };

    var charmeleon = {
        id: 4, nome: "charmeleon", tipo1: "fuoco", tipo2: null, ps: 58, att: 64, dif: 58, atts: 80, difs: 65, vel: 80, 
        mini_sprite: "../../../assets/pokemon/mini_sprite/charmeleon.png",
        front_sprite: "../../../assets/pokemon/front_sprite/charmeleon.gif",
        back_sprite: "../../../assets/pokemon/back_sprite/charmeleon.gif",
        mosse: [
            {id:10, nome: "graffio", tipo:"normale", potenza:40, precisione:100, categoria: "fisico"},
            {id:13, nome: "taglio", tipo:"normale", potenza:50, precisione:95, categoria: "fisico"},
            {id:7, nome: "fuocopugno", tipo:"fuoco", potenza:75, precisione:100, categoria: "fisico"},
            {id:40, nome: "lanciafiamme", tipo:"fuoco", potenza:90, precisione:100, categoria: "speciale"}
        ]
    };

    var charizard = {
        id: 4, nome: "charizard", tipo1: "fuoco", tipo2: "volante", ps: 78, att: 84, dif: 78, atts: 109, difs: 85, vel: 100, 
        mini_sprite: "../../../assets/pokemon/mini_sprite/charizard.png",
        front_sprite: "../../../assets/pokemon/front_sprite/charizard.gif",
        back_sprite: "../../../assets/pokemon/back_sprite/charizard.gif",
        mosse: [
            {id:10, nome: "graffio", tipo:"normale", potenza:40, precisione:100, categoria: "fisico"},
            {id:13, nome: "taglio", tipo:"normale", potenza:50, precisione:95, categoria: "fisico"},
            {id:7, nome: "fuocopugno", tipo:"fuoco", potenza:75, precisione:100, categoria: "fisico"},
            {id:40, nome: "lanciafiamme", tipo:"fuoco", potenza:90, precisione:100, categoria: "speciale"}
        ]
    };

    var gelopugno = {
        id:8, nome: "gelopugno", tipo:"ghiaccio", potenza:75, precisione:100, categoria: "fisico"
    };

    //TESTING
    avver.aggiungiPkm(venusaur);
    avver.aggiungiPkm(ivysaur);
    avver.aggiungiPkm(bulbasaur);
    avver.aggiungiPkm(charizard);
    avver.aggiungiPkm(charmeleon);
    avver.aggiungiPkm(charmander);
    
});
    