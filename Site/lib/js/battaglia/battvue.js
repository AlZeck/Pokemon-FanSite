//variabile per poterlo usare al di fuori
var battVue;

//un oggetto pokemon di default
var defaultPkm = {
    id: 0,
    nome: "???",
    tipo1: "???",
    tipo2: null,
    psMax: 0,
    ps: 0,
    att: 0,
    dif: 0,
    atts: 0,
    difs: 0,
    vel: 0, 
    mini_sprite: "/assets/pokemon/default_sprites/default_mini.png",
    front_sprite: "/assets/pokemon/default_sprites/default_front_back.png",
    back_sprite: "/assets/pokemon/default_sprites/default_front_back.png",
    mosse: []
};



//per caricare l'oggetto vue con le sue informazioni al caricamento della pagina
window.addEventListener("load", function() {

    //oggetto vue per le informazioni del gioco
    battVueObj = {
        //id dell'element associato
        el: '#battVue',

        data: {
            //oggetto BCPController usato per la comunicazione col server
            bcpc: undefined,

            //flag per attivare il pulsante di switch quando serve
            switchAttivo: false,

            //flag per attivare i pulsanti delle mosse quando serve
            mosseAttive: false,

            //flag per attivare il pulsante di forfeit quando serve
            forfeitAttivo: false,

            protagonista: {
                //campo per lo username (che funge da chiave) del giocatore (inizialmente stringa vuota)
                username: "",

                //index della squadra per il pokemon attivo (inizialmente 0)
                indexActivePkm: 0,

                //index della squadra per il pokemon selezionato (inizialmente 0)
                indexSelectedPkm: 0,

                //index indicante se deve mostrare lo sprite del pokemon (0) o della pokeball (1) (inizialmente 1)
                indexSprite: 1,

                //la squadra corrente, in posizione 0 ci sta il pokemon di default, ma nel caso del protagonista viene subito inizializzata tutta ai pokemon scelti
                squadra: [ defaultPkm ]
            },

            avversario: {
                //campo per lo username (che funge da chiave) del giocatore (inizialmente stringa vuota)
                username: "",

                //index della squadra per il pokemon attivo (inizialmente 0)
                indexActivePkm: 0,

                //index della squadra per il pokemon selezionato (inizialmente 0)
                indexSelectedPkm: 0,

                //index indicante se deve mostrare lo sprite del pokemon (0) o della pokeball (1) (inizialmente 1)
                indexSprite: 1,

                //la squadra corrente, in posizione 0 ci sta il pokemon di default, ma nel caso del protagonista viene subito inizializzata tutta ai pokemon scelti
                squadra: [ defaultPkm ]
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


            //DA MODIFICARE PER USARE BCPController
            //metodo per mandare al server un messaggio di "mossa" (conseguentemente disattivo pulsanti)
            mandaMossa(e) {
                if(! this.mosseAttive) return;  //controllo se posso inviare messaggio o meno

                this.disabilitaTutto();
                document.getElementById("testoBattaglia").innerText = "Hai scelto una mossa. In attesa di risposta dal server...";

                /*
                //testing
                var msg = {
                    "utente": this.protagonista.username,
                    "azione": "mossa",
                    "valore": e.target.value
                };
                console.log(msg);
                */
                
                    this.bcpc.sendBattleMessage({
                        "utente": this.protagonista.username,
                        "azione": "mossa",
                        "valore": e.target.value
                    });
                
            },


            //DA MODIFICARE PER USARE BCPController
            //metodo per mandare al server un messaggio di "switch" (conseguentemente disattivo pulsanti)
            mandaSwitch() {
                this.disabilitaTutto();
                document.getElementById("testoBattaglia").innerText = "Hai scelto uno switch. In attesa di risposta dal server...";

                /*
                //testing
                var msg = {
                    "utente": this.protagonista.username,
                    "azione": "switch",
                    "valore": this.protagonista.squadra[this.protagonista.indexSelectedPkm].id
                };
                console.log(msg);
                */
                
                    this.bcpc.sendBattleMessage({
                        "utente": this.protagonista.username,
                        "azione": "switch",
                        "valore": this.protagonista.squadra[this.protagonista.indexSelectedPkm].id
                    });
                
            },


            //DA MODIFICARE PER USARE BCPController
            //metodo per mandare al server un messaggio di "forfeit" (conseguentemente disattivo pulsanti)
            mandaForfeit() {
                this.disabilitaTutto();
                document.getElementById("testoBattaglia").innerText = "Hai scelto il forfeit. In attesa di risposta dal server...";

                /*
                //testing
                var msg = {
                    "utente": this.protagonista.username,
                    "azione": "forfeit",
                    "valore": 0
                };
                console.log(msg);
                */

                
                    this.bcpc.sendBattleMessage({
                        "utente": this.protagonista.username,
                        "azione": "forfeit",
                        "valore": 0
                    });
                
            },


            //DA MODIFICARE PER USARE BCPController
            //metodo per mandare al server un messaggio di "attesa" (conseguentemente non riattivo alcun pulsante)
            mandaAttesa() {
                /*
                //testing
                var msg = {
                    "utente": this.protagonista.username,
                    "azione": "attesa",
                    "valore": 0
                };
                console.log(msg);
                */

                
                    this.bcpc.sendBattleMessage({
                        "utente": this.protagonista.username,
                        "azione": "attesa",
                        "valore": 0
                    });
                
            },


            //metodo per cambiare il pokemon selezionato dell'allenatore in base all'indice passato e se il pokemon è noto o meno
            cambiaSelectedPkm: function(i, allenatore) {
                if(i < allenatore.squadra.length) allenatore.indexSelectedPkm = i;
            },


            //metodo per cambiare il pokemon attivo dell'allenatore dato un id (controlla se è esausto nel dom)
            cambiaActivePkm: function(id, allenatore) {
                for(j=1; j<allenatore.squadra.length; j++) {
                    if(allenatore.squadra[j].id == id) {
                        allenatore.indexActivePkm = j;
                        return;
                    }
                }

                if(j < 7) {
                    this.aggiungiPkm(id, allenatore)
                    allenatore.indexActivePkm = j;
                }
            },


            //metodo per restituire una mossa del pokemon attivo passato dato il suo id
            dammiMossa: function(id, activePkm) {
                for(j=0; j<activePkm.mosse.length; j++) {
                    if(activePkm.mosse[j].id == id) return activePkm.mosse[j];
                }

                if(j < 4) {
                    this.aggiungiMossa(id, activePkm);
                    return activePkm.mosse[j];
                }
            },


            //metodo per aggiungere una mossa dal suo id all'oggetto pokemon passato se c'è spazio nel suo moveset
            aggiungiMossa: function(mossa, pkm) {    
                pkm.mosse.push( prendiDalDB("mossa", mossa) );
            },


            //metodo per aggiungere un oggetto pokemon passato il suo id se c'è spazio nella squadra dell'allenatore passato
            //se è il primo è settato automaticamente a selezionato ed attivo
            aggiungiPkm: function(pkm, allenatore) {
                allenatore.squadra.push( prendiDalDB("pokemon", pkm) );

                if(allenatore.squadra.length == 2) {
                    allenatore.indexSelectedPkm = 1;
                    allenatore.indexActivePkm = 1;
                }
            },


            //DA MODIFICARE UNA VOLTA SI LAVORA SU VERA GUI
            //metodo per mostrare sulla gui la mossa subita dal difensore
            //attaccante e difensore possono essere solo le stringhe "Prt" o "Avv" e diversi fra loro
            animazioneBattaglia: function(tipo, attaccante, difensore) {
                //CAMBIA BACKGROUND IN BASE TIPO

                var selettoreAtt = "#sprite" + attaccante;
                var selettoreDif = "#sprite" + difensore;

                $(selettoreDif).css("transition", "transform 0.1s");
                $(selettoreAtt).css("transition", "transform 0.1s");

                setTimeout(function() {
                    if(attaccante == "Avv") $(selettoreAtt).css("transform", "rotate(-20deg)");
                    else $(selettoreAtt).css("transform", "rotate(20deg)");

                    setTimeout(function() {
                        if(attaccante == "Avv") {
                            $(selettoreAtt).css("transform", "translate(-10px,0px)");
                            $(selettoreDif).css("transform", "rotate(-20deg)");
                        }
                        else {
                            $(selettoreAtt).css("transform", "translate(10px,0px)");
                            $(selettoreDif).css("transform", "rotate(20deg)");
                        }

                        setTimeout(function() {
                            $(selettoreAtt).css("transform", "translate(0px,0px)");
                            $(selettoreDif).css("transform", "translate(-5px,0px)");

                            setTimeout(function() {
                                $(selettoreDif).css("transform", "translate(5px,0px)");

                                setTimeout(function() {
                                    $(selettoreDif).css("transform", "translate(-5px,0px)");

                                    setTimeout(function() {
                                        $(selettoreDif).css("transform", "translate(5px,0px)");

                                        setTimeout(function() {
                                            $(selettoreDif).css("transform", "translate(0px,0px)");
                                        }, 300);
                                    }, 300);
                                }, 300);
                            }, 300);
                        }, 300);
                    }, 300);
                }, 100);

                setTimeout(function() {
                    $(selettoreDif).css("transition", "transform 0s");
                    $(selettoreAtt).css("transition", "transform 0s");

                    //CAMBIA BACKGROUND A DEFAULT
                }, 2800);      
            },


            //DA MODIFICARE UNA VOLTA SI LAVORA SU VERA GUI
            //funzione per mostrare sulla gui l'abbassamento dei ps sulla barra del pokemon dell'allenatore (allenatoreStringa o "Prt" o "Avv")
            animazioneBarra: function(nuoviPS, allenatore, allenatoreStringa) {
                //fai un'animazione della barra che scende dal livello attuale a quello passato
                //il colore è già gestito dal dom

                //per testing
                console.log(allenatore.username + " --- " + nuoviPS + " --- " + $("#ps" + allenatoreStringa).css("color"));
            },


            //funzione per mostrare sulla gui il ritiro del pokemon attivo dell'allenatore dalla lotta (allenatoreStringa o "Prt" o "Avv")
            animazioneRitiro: function(allenatore, allenatoreStringa) {
                var selettoreAllen = "#sprite" + allenatoreStringa;
                $(selettoreAllen).css("transition", "transform 3s");
                $(selettoreAllen).css("transform", "scale(0.2)");

                //var allen = allenatore;

                setTimeout(function() {
                    $(selettoreAllen).css("transition", "transform 0s");
                    $(selettoreAllen).css("transform", "scale(1)");

                    allenatore.indexSprite = 1;
                }, 2300); 
            },


            //metodo per mostrare sulla gui il mandare il pokemon dell'allenatore in campo (allenatoreStringa o "Prt" o "Avv")
            animazioneSwitch: function(allenatore, allenatoreStringa) {
                allenatore.indexSprite = 0;

                var selettoreAllen = "#sprite" + allenatoreStringa;
                $(selettoreAllen).css("transition", "transform 0s");
                $(selettoreAllen).css("transform", "scale(0.2)");
                
                setTimeout(function() {
                    $(selettoreAllen).css("transition", "transform 3s");
                    $(selettoreAllen).css("transform", "scale(1)");
                }, 100);
            },
        }
    };



    /*
        ------------------------------------------------------------------------------------------
        ------------------------------------------------------------------------------------------
        ------------------------------------------------------------------------------------------
    */



    //TESTING
    battVue = new Vue(battVueObj);

    battVue.protagonista.username = "Red";

    battVue.aggiungiPkm(6, battVue.protagonista);
    battVue.aggiungiMossa(10, battVue.primoPkmPrt);
    battVue.aggiungiMossa(13, battVue.primoPkmPrt);
    battVue.aggiungiMossa(7, battVue.primoPkmPrt);
    battVue.aggiungiMossa(40, battVue.primoPkmPrt);

    battVue.aggiungiPkm(5, battVue.protagonista);
    battVue.aggiungiMossa(10, battVue.secondoPkmPrt);
    battVue.aggiungiMossa(13, battVue.secondoPkmPrt);
    battVue.aggiungiMossa(7, battVue.secondoPkmPrt);
    battVue.aggiungiMossa(40, battVue.secondoPkmPrt);

    battVue.aggiungiPkm(4, battVue.protagonista);
    battVue.aggiungiMossa(10, battVue.terzoPkmPrt);
    battVue.aggiungiMossa(13, battVue.terzoPkmPrt);
    battVue.aggiungiMossa(7, battVue.terzoPkmPrt);
    battVue.aggiungiMossa(40, battVue.terzoPkmPrt);
    
    battVue.aggiungiPkm(3, battVue.protagonista);
    battVue.aggiungiMossa(28, battVue.quartoPkmPrt);
    battVue.aggiungiMossa(13, battVue.quartoPkmPrt);
    battVue.aggiungiMossa(19, battVue.quartoPkmPrt);
    battVue.aggiungiMossa(58, battVue.quartoPkmPrt);

    battVue.aggiungiPkm(2, battVue.protagonista);
    battVue.aggiungiMossa(28, battVue.quintoPkmPrt);
    battVue.aggiungiMossa(13, battVue.quintoPkmPrt);
    battVue.aggiungiMossa(19, battVue.quintoPkmPrt);
    battVue.aggiungiMossa(58, battVue.quintoPkmPrt);
    
    battVue.aggiungiPkm(1, battVue.protagonista);
    battVue.aggiungiMossa(28, battVue.sestoPkmPrt);
    battVue.aggiungiMossa(13, battVue.sestoPkmPrt);
    battVue.aggiungiMossa(19, battVue.sestoPkmPrt);
    battVue.aggiungiMossa(58, battVue.sestoPkmPrt);



    battVue.avversario.username = "CPU";

    /*
    battVue.aggiungiPkm(3, battVue.avversario);
    battVue.aggiungiMossa(28, battVue.primoPkmAvv);
    battVue.aggiungiMossa(13, battVue.primoPkmAvv);
    battVue.aggiungiMossa(19, battVue.primoPkmAvv);
    battVue.aggiungiMossa(58, battVue.primoPkmAvv);

    battVue.aggiungiPkm(2, battVue.avversario);
    battVue.aggiungiMossa(28, battVue.secondoPkmAvv);
    battVue.aggiungiMossa(13, battVue.secondoPkmAvv);
    battVue.aggiungiMossa(19, battVue.secondoPkmAvv);
    battVue.aggiungiMossa(58, battVue.secondoPkmAvv);

    battVue.aggiungiPkm(1, battVue.avversario);
    battVue.aggiungiMossa(28, battVue.terzoPkmAvv);
    battVue.aggiungiMossa(13, battVue.terzoPkmAvv);
    battVue.aggiungiMossa(19, battVue.terzoPkmAvv);
    battVue.aggiungiMossa(58, battVue.terzoPkmAvv);

    battVue.aggiungiPkm(6, battVue.avversario);
    battVue.aggiungiMossa(10, battVue.quartoPkmAvv);
    battVue.aggiungiMossa(13, battVue.quartoPkmAvv);
    battVue.aggiungiMossa(7, battVue.quartoPkmAvv);
    battVue.aggiungiMossa(40, battVue.quartoPkmAvv);

    battVue.aggiungiPkm(5, battVue.avversario);
    battVue.aggiungiMossa(10, battVue.quintoPkmAvv);
    battVue.aggiungiMossa(13, battVue.quintoPkmAvv);
    battVue.aggiungiMossa(7, battVue.quintoPkmAvv);
    battVue.aggiungiMossa(40, battVue.quintoPkmAvv);

    battVue.aggiungiPkm(4, battVue.avversario);
    battVue.aggiungiMossa(10, battVue.sestoPkmAvv);
    battVue.aggiungiMossa(13, battVue.sestoPkmAvv);
    battVue.aggiungiMossa(7, battVue.sestoPkmAvv);
    battVue.aggiungiMossa(40, battVue.sestoPkmAvv);
    */
});
