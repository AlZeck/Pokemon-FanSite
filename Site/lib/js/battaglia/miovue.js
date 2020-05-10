//per caricare l'oggetto vue con le sue informazioni al caricamento della pagina
window.addEventListener("load", function() {

    //oggetto vue per le informazioni del gioco
    mioVue = new Vue({
        //id dell'element associato
        el: '#mioVue',

        data: {
            //oggetto BCPController usato per la comunicazione col server
            bcpc: undefined,

            //flag per attivare il pulsante di switch quando serve
            switchAttivo: true,

            //flag per attivare i pulsanti delle mosse quando serve
            mosseAttive: true,

            //flag per attivare il pulsante di forfeit quando serve
            forfeitAttivo: true,

            protagonista: {
                //campo per lo username (che funge da chiave) del giocatore (inizialmente stringa vuota)
                username: "",

                //index della squadra per il pokemon attivo (inizialmente 0)
                indexActivePkm: 0,

                //index della squadra per il pokemon selezionato (inizialmente 0)
                indexSelectedPkm: 0,

                //la squadra corrente, in posizione 0 ci sta il pokemon di default, ma nel caso del protagonista viene subito inizializzata tutta ai pokemon scelti
                squadra: [  
                    {
                        id: 0, nome: "???", tipo1: "???", tipo2: null, psMax: 0, ps: 0, att: 0, dif: 0, atts: 0, difs: 0, vel: 0, 
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

            avversario: {
                //campo per lo username (che funge da chiave) del giocatore (inizialmente stringa vuota)
                username: "",

                //index della squadra per il pokemon attivo (inizialmente 0)
                indexActivePkm: 0,

                //index della squadra per il pokemon selezionato (inizialmente 0)
                indexSelectedPkm: 0,

                //la squadra corrente, in posizione 0 ci sta il pokemon di default, ma nel caso del protagonista viene subito inizializzata tutta ai pokemon scelti
                squadra: [  
                    {
                        id: 0, nome: "???", tipo1: "???", tipo2: null, psMax: 0, ps: 0, att: 0, dif: 0, atts: 0, difs: 0, vel: 0, 
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
            }
            
        },

        computed: {
            //il computed per ottenere il pokemon attivo del protagonista in base al valore del suo indice
            activePkmPrt: function() {
                if(this.protagonista.indexActivePkm < 7) return this.protagonista.squadra[this.protagonista.indexActivePkm];
                else return this.protagonista.squadra[0];
            },


            //il computed per ottenere il pokemon selezionato del protagonista in base al valore del suo indice
            selectedPkmPrt: function() {
                if(this.protagonista.indexSelectedPkm < 7) return this.protagonista.squadra[this.protagonista.indexSelectedPkm];
                else return this.protagonista.squadra[0];
            },


            //il computed per ottenere il primo pokemon della squadra del protagonista se c'è o quello di default
            primoPkmPrt: function() {
                if(this.protagonista.squadra.length >= 2) return this.protagonista.squadra[1];
                else return this.protagonista.squadra[0];
            },


            //il computed per ottenere il secondo pokemon della squadra del protagonista se c'è o quello di default
            secondoPkmPrt: function() {
                if(this.protagonista.squadra.length >= 3) return this.protagonista.squadra[2];
                else return this.protagonista.squadra[0];
            },


            //il computed per ottenere il terzo pokemon della squadra del protagonista se c'è o quello di default
            terzoPkmPrt: function() {
                if(this.protagonista.squadra.length >= 4) return this.protagonista.squadra[3];
                else return this.protagonista.squadra[0];
            },


            //il computed per ottenere il quarto pokemon della squadra del protagonista se c'è o quello di default
            quartoPkmPrt: function() {
                if(this.protagonista.squadra.length >= 5) return this.protagonista.squadra[4];
                else return this.protagonista.squadra[0];
            },


            //il computed per ottenere il quinto pokemon della squadra del protagonista se c'è o quello di default
            quintoPkmPrt: function() {
                if(this.protagonista.squadra.length >= 6) return this.protagonista.squadra[5];
                else return this.protagonista.squadra[0];
            },


            //il computed per ottenere il sesto pokemon della squadra del protagonista se c'è o quello di default
            sestoPkmPrt: function() {
                if(this.protagonista.squadra.length >= 7) return this.protagonista.squadra[6];
                else return this.protagonista.squadra[0];
            },


            /*
                ------------------------------------------------------------------------------------------
                ------------------------------------------------------------------------------------------
                ------------------------------------------------------------------------------------------
            */


            //il computed per ottenere il pokemon attivo dell'avversario in base al valore del suo indice
            activePkmAvv: function() {
                if(this.avversario.indexActivePkm < 7) return this.avversario.squadra[this.avversario.indexActivePkm];
                else return this.avversario.squadra[0];
            },


            //il computed per ottenere il pokemon selezionato dell'avversario in base al valore del suo indice
            selectedPkmAvv: function() {
                if(this.avversario.indexSelectedPkm < 7) return this.avversario.squadra[this.avversario.indexSelectedPkm];
                else return this.avversario.squadra[0];
            },


            //il computed per ottenere il primo pokemon della squadra dell'avversario se c'è o quello di default
            primoPkmAvv: function() {
                if(this.avversario.squadra.length >= 2) return this.avversario.squadra[1];
                else return this.avversario.squadra[0];
            },


            //il computed per ottenere il secondo pokemon della squadra dell'avversario se c'è o quello di default
            secondoPkmAvv: function() {
                if(this.avversario.squadra.length >= 3) return this.avversario.squadra[2];
                else return this.avversario.squadra[0];
            },


            //il computed per ottenere il terzo pokemon della squadra dell'avversario se c'è o quello di default
            terzoPkmAvv: function() {
                if(this.avversario.squadra.length >= 4) return this.avversario.squadra[3];
                else return this.avversario.squadra[0];
            },


            //il computed per ottenere il quarto pokemon della squadra dell'avversario se c'è o quello di default
            quartoPkmAvv: function() {
                if(this.avversario.squadra.length >= 5) return this.avversario.squadra[4];
                else return this.avversario.squadra[0];
            },


            //il computed per ottenere il quinto pokemon della squadra dell'avversario se c'è o quello di default
            quintoPkmAvv: function() {
                if(this.avversario.squadra.length >= 6) return this.avversario.squadra[5];
                else return this.avversario.squadra[0];
            },


            //il computed per ottenere il sesto pokemon della squadra dell'avversario se c'è o quello di default
            sestoPkmAvv: function() {
                if(this.avversario.squadra.length >= 7) return this.avversario.squadra[6];
                else return this.avversario.squadra[0];
            }          
        },

        methods: {
            //metodo per non permettere al giocatore di scegliere alcuna azione
            disabilitaTutto() {
                this.switchAttivo = false;
                this.mosseAttive = false;
                this.forfeitAttivo = false;
            },


            //metodo per permettere al giocatore di scegliere liberamente la sua prossima azione
            attivaTutto() {
                this.switchAttivo = true;
                this.mosseAttive = true;
                this.forfeitAttivo = true;
            },


            //metodo per costringere il giocatore a switchare, attivando soltanto lo switch (i bottoni erano stati già precedentemente disattivati)
            switchForzato() {
                this.switchAttivo = true;
            },


            //metodo per mandare al server un messaggio di "mossa" (conseguentemente disattivo pulsanti)
            mandaMossa(e) {
                if(! this.mosseAttive) return;  //controllo se posso inviare messaggio o meno

                this.disabilitaTutto();
                document.getElementById("testoBattaglia").innerText = "Hai scelto una mossa. In attesa di risposta dal server...";

                //testing
                var msg = {
                    "utente": this.protagonista.username,
                    "azione": "mossa",
                    "valore": e.target.value
                };
                console.log(msg);

                /*
                    this.bcpc.sendBattleMessage({
                        "utente": this.protagonista.username,
                        "azione": "mossa",
                        "valore": e.target.value
                    });
                */
            },


            //metodo per mandare al server un messaggio di "switch" (conseguentemente disattivo pulsanti)
            mandaSwitch() {
                this.disabilitaTutto();
                document.getElementById("testoBattaglia").innerText = "Hai scelto uno switch. In attesa di risposta dal server...";

                //testing
                var msg = {
                    "utente": this.protagonista.username,
                    "azione": "switch",
                    "valore": this.protagonista.squadra[this.protagonista.indexSelectedPkm].id
                };
                console.log(msg);

                /*
                    this.bcpc.sendBattleMessage({
                        "utente": this.protagonista.username,
                        "azione": "switch",
                        "valore": this.protagonista.squadra[this.protagonista.indexSelectedPkm].id
                    });
                */
            },


            //metodo per mandare al server un messaggio di "forfeit" (conseguentemente disattivo pulsanti)
            mandaForfeit() {
                this.disabilitaTutto();
                document.getElementById("testoBattaglia").innerText = "Hai scelto il forfeit. In attesa di risposta dal server...";

                //testing
                var msg = {
                    "utente": this.protagonista.username,
                    "azione": "forfeit",
                    "valore": 0
                };
                console.log(msg);

                /*
                    this.bcpc.sendBattleMessage({
                        "utente": this.protagonista.username,
                        "azione": "forfeit",
                        "valore": 0
                    });
                */
            },


            //metodo per mandare al server un messaggio di "attesa" (conseguentemente non riattivo alcun pulsante)
            mandaAttesa() {
                //testing
                var msg = {
                    "utente": this.protagonista.username,
                    "azione": "attesa",
                    "valore": 0
                };
                console.log(msg);

                /*
                    this.bcpc.sendBattleMessage({
                        "utente": this.protagonista.username,
                        "azione": "attesa",
                        "valore": 0
                    });
                */
            },


            //metodo per aggiungere una mossa al pokemon passato se c'è spazio nel suo moveset
            aggiungiMossa: function(mossa, pkm) {    
                if(pkm.mosse.length < 4) pkm.mosse.push(mossa);
            },


            /*
                ------------------------------------------------------------------------------------------
                ------------------------------------------------------------------------------------------
                ------------------------------------------------------------------------------------------
            */


            //metodo per cambiare il pokemon selezionato del protagonista in base all'indice passato e se il pokemon è noto o meno
            cambiaSelectedPkmPrt: function(i) {
                if(i < this.protagonista.squadra.length) this.protagonista.indexSelectedPkm = i;
            },


            //metodo per cambiare il pokemon attivo del protagonista dato un id (controlla se è esausto nel dom)
            cambiaActivePkmPrt: function(id) {
                for(j=1; j<this.protagonista.squadra.length; j++) {
                    if(this.protagonista.squadra[j].id == id) {
                        this.protagonista.indexActivePkm = j;
                        return;
                    }
                }

                /*
                if(j<8) {
                    this.protagonista.squadra.push( NUOVO OGGETTO POKEMON IN BASE A ID );
                    this.protagonista.indexActivePkm = j;
                }
                */
            },


            //metodo per aggiungere un oggetto pokemon passato se c'è spazio nella squadra del protagonista, se è il primo è settato automaticamente a selezionato ed attivo
            aggiungiPkmPrt: function(pkm) {
                if(this.protagonista.squadra.length < 7) {
                    this.protagonista.squadra.push(pkm);

                    if(this.protagonista.squadra.length == 2) {
                        this.protagonista.indexSelectedPkm = 1;
                        this.protagonista.indexActivePkm = 1;
                    }
                }
            },


            //metodo per restituire una mossa del pokemon attivo del protagonista dato il suo id
            dammiMossaPrt: function(id) {
                for(j=0; j<this.activePkmPrt.mosse.length; j++) {
                    if(this.activePkmPrt.mosse[j].id == id) return this.activePkmPrt.mosse[j];
                }
            },


            //metodo per mostrare sulla gui la mossa subita dal protagonista
            subisciAnimazioneBattagliaPrt: function(tipo) {
                //fai un'animazione del tipo giusto dell'azione subita sul pokemon attivo del protagonista

                //per testing
                console.log(this.protagonista.username + " --- " + tipo);
            },


            //funzione per mostrare sulla gui l'abbassamento dei ps sulla barra del pokemon del protagonista
            subisciAnimazioneBarraPrt: function(nuoviPS) {
                //fai un'animazione della barra che scende dal livello attuale a quello passato
                //se sotto la metà falla da verde a gialla, sotto un quarto rossa

                //per testing
                var colore;
                if(nuoviPS <= this.activePkmPrt.psMax/4) colore = "rosso";
                else if(nuoviPS <= this.activePkmPrt.psMax/2) colore = "giallo";
                else colore = "verde";

                console.log(this.protagonista.username + " --- " + nuoviPS + " --- " + colore);
            },


            //funzione per mostrare sulla gui il ritiro del pokemon attivo del protagonista dalla lotta
            eseguiAnimazioneRitiroPrt: function() {
                //mostrare l'animazione di ritiro

                //per testing
                console.log(this.protagonista.username + " --- ritiro");
            },


            //metodo per mostrare sulla gui il mandare il pokemon del protagonista in campo
            eseguiAnimazioneSwitchPrt: function() {
                //faccio animazione sul pokemon attivo del protagonista per far apparire lo sprite corretto

                //per testing
                console.log(this.protagonista.username + " --- switch");
            },


            /*
                ------------------------------------------------------------------------------------------
                ------------------------------------------------------------------------------------------
                ------------------------------------------------------------------------------------------
            */


            //metodo per cambiare il pokemon selezionato dell'avversario in base all'indice passato e se il pokemon è noto o meno
            cambiaSelectedPkmAvv: function(i) {
                if(i < this.avversario.squadra.length) this.avversario.indexSelectedPkm = i;
            },


            //metodo per cambiare il pokemon attivo dell'avversario dato un id
            cambiaActivePkmAvv: function(id) {
                for(j=1; j<this.avversario.squadra.length; j++) {
                    if(this.avversario.squadra[j].id == id) {
                        this.avversario.indexActivePkm = j;
                        return;
                    }
                }

                /*
                if(j<8) {
                    this.avversario.squadra.push( NUOVO OGGETTO POKEMON IN BASE A ID );
                    this.avversario.indexActivePkm = j;
                }
                */
            },


            //metodo per aggiungere un oggetto pokemon passato se c'è spazio nella squadra dell'avversario, se è il primo è settato automaticamente a selezionato ed attivo
            aggiungiPkmAvv: function(pkm) {
                if(this.avversario.squadra.length < 7) {
                    this.avversario.squadra.push(pkm);

                    if(this.avversario.squadra.length == 2) {
                        this.avversario.indexSelectedPkm = 1;
                        this.avversario.indexActivePkm = 1;
                    }
                }
            },


            //metodo per restituire una mossa del pokemon attivo dell'avversario dato il suo id
            dammiMossaAvv: function(id) {
                for(j=0; j<this.activePkmAvv.mosse.length; j++) {
                    if(this.activePkmAvv.mosse[j].id == id) return this.activePkmAvv.mosse[j];
                }
            },


            //metodo per mostrare sulla gui la mossa subita dall'avversario
            subisciAnimazioneBattagliaAvv: function(tipo) {
                //fai un'animazione del tipo giusto dell'azione subita sul pokemon attivo dell'avversario

                //per testing
                console.log(this.avversario.username + " --- " + tipo);
            },


            //funzione per mostrare sulla gui l'abbassamento dei ps sulla barra del pokemon dell'avversario
            subisciAnimazioneBarraAvv: function(nuoviPS) {
                //fai un'animazione della barra che scende dal livello attuale a quello passato
                //se sotto la metà falla da verde a gialla, sotto un quarto rossa

                //per testing
                var colore;
                if(nuoviPS <= this.activePkmAvv.psMax/4) colore = "rosso";
                else if(nuoviPS <= this.activePkmAvv.psMax/2) colore = "giallo";
                else colore = "verde";

                console.log(this.avversario.username + " --- " + nuoviPS + " --- " + colore);
            },


            //funzione per mostrare sulla gui il ritiro del pokemon attivo dell'avversario dalla lotta
            eseguiAnimazioneRitiroAvv: function() {
                //mostrare l'animazione di ritiro

                //per testing
                console.log(this.avversario.username + " --- ritiro");
            },


            //metodo per mostrare sulla gui il mandare il pokemon dell'avversario in campo
            eseguiAnimazioneSwitchAvv: function() {
                //faccio animazione sul pokemon attivo dell'avversario per far apparire lo sprite corretto

                //per testing
                console.log(this.avversario.username + " --- switch");
            }
        }
    });



    /*
        ------------------------------------------------------------------------------------------
        ------------------------------------------------------------------------------------------
        ------------------------------------------------------------------------------------------
    */



    //TESTING
    mioVue.protagonista.username = "Red";
    mioVue.avversario.username = "Blue";

    mioVue.aggiungiPkmPrt(charizard);
    mioVue.aggiungiPkmPrt(charmeleon);
    mioVue.aggiungiPkmPrt(charmander);
    mioVue.aggiungiPkmPrt(venusaur);
    mioVue.aggiungiPkmPrt(ivysaur);
    mioVue.aggiungiPkmPrt(bulbasaur);

    mioVue.aggiungiPkmAvv(venusaur);
    mioVue.aggiungiPkmAvv(ivysaur);
    mioVue.aggiungiPkmAvv(bulbasaur);
    mioVue.aggiungiPkmAvv(charizard);
    mioVue.aggiungiPkmAvv(charmeleon);
    mioVue.aggiungiPkmAvv(charmander);
});



/*
    ------------------------------------------------------------------------------------------
    ------------------------------------------------------------------------------------------
    ------------------------------------------------------------------------------------------
*/



var mioVue;

var bulbasaur = {
    id: 1, nome: "Bulbasaur", tipo1: "erba", tipo2: "veleno", psMax: 45, ps: 45, att: 49, dif: 49, atts: 65, difs: 65, vel: 45, 
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
    id: 2, nome: "Ivysaur", tipo1: "erba", tipo2: "veleno", psMax: 60, ps: 60, att: 62, dif: 63, atts: 80, difs: 80, vel: 60, 
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
    id: 3, nome: "Venusaur", tipo1: "erba", tipo2: "veleno", psMax: 80, ps: 80, att: 82, dif: 83, atts: 100, difs: 100, vel: 80, 
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
    id: 4, nome: "Charmander", tipo1: "fuoco", tipo2: null, psMax: 39, ps: 39, att: 52, dif: 43, atts: 60, difs: 50, vel: 65, 
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
    id: 5, nome: "Charmeleon", tipo1: "fuoco", tipo2: null, psMax: 58, ps: 58, att: 64, dif: 58, atts: 80, difs: 65, vel: 80, 
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
    id: 6, nome: "Charizard", tipo1: "fuoco", tipo2: "volante", psMax: 78, ps: 78, att: 84, dif: 78, atts: 109, difs: 85, vel: 100, 
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
