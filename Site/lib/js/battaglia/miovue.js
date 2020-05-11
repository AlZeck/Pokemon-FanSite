//variabile per poterlo usare al di fuori

var mioVue;

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
                squadra: [  
                    {
                        id: 0, nome: "???", tipo1: "???", tipo2: null, psMax: 0, ps: 0, att: 0, dif: 0, atts: 0, difs: 0, vel: 0, 
                        mini_sprite: "/assets/pokemon/default_sprites/default_mini.png",
                        front_sprite: "/assets/pokemon/default_sprites/default_front_back.png",
                        back_sprite: "/assets/pokemon/default_sprites/default_front_back.png",
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

                //index indicante se deve mostrare lo sprite del pokemon (0) o della pokeball (1) (inizialmente 1)
                indexSprite: 1,

                //la squadra corrente, in posizione 0 ci sta il pokemon di default, ma nel caso del protagonista viene subito inizializzata tutta ai pokemon scelti
                squadra: [  
                    {
                        id: 0, nome: "???", tipo1: "???", tipo2: null, psMax: 0, ps: 0, att: 0, dif: 0, atts: 0, difs: 0, vel: 0, 
                        mini_sprite: "/assets/pokemon/default_sprites/default_mini.png",
                        front_sprite: "/assets/pokemon/default_sprites/default_front_back.png",
                        back_sprite: "/assets/pokemon/default_sprites/default_front_back.png",
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


            //DA MODIFICARE PER USARE BCPController
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


            //DA MODIFICARE PER USARE BCPController
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


            //DA MODIFICARE PER USARE BCPController
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


            //DA MODIFICARE PER USARE BCPController
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


            //DA MODIFICARE PER USARE BCPController
            //FARE QUI METODI mandaAzioneCPU() (che sceglie tra mossa e switch) e mandaAttesaCPU(). CPU non forfeitta mai
            /*
            mandaAzioneCPU() {
                var rand = Math.floor(Math.random() * 10);

                if(rand >= 8) {
                    //usa uno switch

                    //controlla puoi switchare
                    for(i=1; i<this.avversario.squadra.length; i++) {
                        
                    }
                }
                else {
                    //fai una mossa
                    rand = Math.floor(Math.random() * 4);

                    this.bcpc.sendBattleCPUMessage({
                        "utente": "CPU",
                        "azione": "mossa",
                        "valore": 
                    });
                }
            },


            mandaAttesaCPU() {
                //testing
                var msg = {
                    "utente": "CPU",
                    "azione": "attesa",
                    "valore": 0
                };
                console.log(msg);

                /*
                    this.bcpc.sendBattleCPUMessage({
                        "utente": "CPU",
                        "azione": "attesa",
                        "valore": 0
                    });
                
            },
            */


            //metodo per aggiungere una mossa dal suo id all'oggetto pokemon passato se c'è spazio nel suo moveset
            aggiungiMossa: function(mossa, pkm) {    
                if(pkm.mosse.length < 4) pkm.mosse.push( prendiDalDB("mossa", mossa) );
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
                }this.activePkmPrt.nome

                /*
                if(j<8) {
                    this.protagonista.squadra.push( NUOVO OGGETTO POKEMON IN BASE A ID );
                    this.protagonista.indexActivePkm = j;
                }
                */
            },


            //metodo per aggiungere un oggetto pokemon passato il suo id se c'è spazio nella squadra del protagonista, se è il primo è settato automaticamente a selezionato ed attivo
            aggiungiPkmPrt: function(pkm) {
                if(this.protagonista.squadra.length < 7) {
                    this.protagonista.squadra.push( prendiDalDB("pokemon", pkm) );

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


            //DA MODIFICARE UNA VOLTA SI LAVORA SU VERA GUI
            //metodo per mostrare sulla gui la mossa subita dal protagonista
            subisciAnimazioneBattagliaPrt: function(tipo) {
                //CAMBIA BACKGROUND IN BASE TIPO

                $("#spritePrt").css("transition", "transform 0.1s");
                $("#spriteAvv").css("transition", "transform 0.1s");

                setTimeout(function() {
                    $("#spriteAvv").css("transform", "rotate(-20deg)");

                    setTimeout(function() {
                        $("#spriteAvv").css("transform", "translate(-10px,0px)");
                        $("#spritePrt").css("transform", "rotate(-20deg)");

                        setTimeout(function() {
                            $("#spriteAvv").css("transform", "translate(0px,0px)");
                            $("#spritePrt").css("transform", "translate(-5px,0px)");
        
                            setTimeout(function() {
                                $("#spritePrt").css("transform", "translate(5px,0px)");
        
                                setTimeout(function() {
                                    $("#spritePrt").css("transform", "translate(-5px,0px)");
        
                                    setTimeout(function() {
                                        $("#spritePrt").css("transform", "translate(5px,0px)");
        
                                        setTimeout(function() {
                                            $("#spritePrt").css("transform", "translate(0px,0px)");
                                        }, 300);
                                    }, 300);
                                }, 300);
                            }, 300);
                        }, 300);
                    }, 300);
                }, 100);

                setTimeout(function() {
                    $("#spritePrt").css("transition", "transform 0s");
                    $("#spriteAvv").css("transition", "transform 0s");

                    //CAMBIA BACKGROUND DEFAULT
                }, 2800);      
            },


            //DA MODIFICARE UNA VOLTA SI LAVORA SU VERA GUI
            //funzione per mostrare sulla gui l'abbassamento dei ps sulla barra del pokemon del protagonista
            subisciAnimazioneBarraPrt: function(nuoviPS) {
                //fai un'animazione della barra che scende dal livello attuale a quello passato
                //il colore è già gestito dal dom

                //per testing
                console.log(this.protagonista.username + " --- " + $("#psPrt").css("color"));
            },


            //funzione per mostrare sulla gui il ritiro del pokemon attivo del protagonista dalla lotta
            eseguiAnimazioneRitiroPrt: function() {
                $("#spritePrt").css("transition", "transform 3s");
                $("#spritePrt").css("transform", "scale(0.2)");

                var prt = this.protagonista;

                setTimeout(function() {
                    $("#spritePrt").css("transition", "transform 0s");
                    $("#spritePrt").css("transform", "scale(1)");

                    prt.indexSprite = 1;
                }, 2300); 
            },


            //metodo per mostrare sulla gui il mandare il pokemon del protagonista in campo
            eseguiAnimazioneSwitchPrt: function() {
                this.protagonista.indexSprite = 0;
                
                $("#spritePrt").css("transition", "transform 0s");
                $("#spritePrt").css("transform", "scale(0.2)");
                
                setTimeout(function() {
                    $("#spritePrt").css("transition", "transform 3s");
                    $("#spritePrt").css("transform", "scale(1)");
                }, 100);
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


            //metodo per aggiungere un oggetto pokemon passato il suo id se c'è spazio nella squadra dell'avversario, se è il primo è settato automaticamente a selezionato ed attivo
            aggiungiPkmAvv: function(pkm) {
                if(this.avversario.squadra.length < 7) {
                    this.avversario.squadra.push( prendiDalDB("pokemon", pkm) );

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


            //DA MODIFICARE UNA VOLTA SI LAVORA SU VERA GUI
            //metodo per mostrare sulla gui la mossa subita dall'avversario
            subisciAnimazioneBattagliaAvv: function(tipo) {
                //CAMBIA BACKGROUND IN BASE TIPO

                $("#spriteAvv").css("transition", "transform 0.1s");
                $("#spritePrt").css("transition", "transform 0.1s");

                setTimeout(function() {
                    $("#spritePrt").css("transform", "rotate(20deg)");

                    setTimeout(function() {
                        $("#spritePrt").css("transform", "translate(10px,0px)");
                        $("#spriteAvv").css("transform", "rotate(20deg)");

                        setTimeout(function() {
                            $("#spritePrt").css("transform", "translate(0px,0px)");
                            $("#spriteAvv").css("transform", "translate(5px,0px)");
        
                            setTimeout(function() {
                                $("#spriteAvv").css("transform", "translate(-5px,0px)");
        
                                setTimeout(function() {
                                    $("#spriteAvv").css("transform", "translate(5px,0px)");
        
                                    setTimeout(function() {
                                        $("#spriteAvv").css("transform", "translate(-5px,0px)");
        
                                        setTimeout(function() {
                                            $("#spriteAvv").css("transform", "translate(0px,0px)");
                                        }, 300);
                                    }, 300);
                                }, 300);
                            }, 300);
                        }, 300);
                    }, 300);
                }, 100);

                setTimeout(function() {
                    $("#spriteAvv").css("transition", "transform 0s");
                    $("#spritePrt").css("transition", "transform 0s");

                    //CAMBIA BACKGROUND DEFAULT
                }, 2800); 
            },


            //DA MODIFICARE UNA VOLTA SI LAVORA SU VERA GUI
            //funzione per mostrare sulla gui l'abbassamento dei ps sulla barra del pokemon dell'avversario
            subisciAnimazioneBarraAvv: function(nuoviPS) {
                //fai un'animazione della barra che scende dal livello attuale a quello passato
                //il colore è già gestito dal dom

                //per testing
                console.log(this.avversario.username + " --- " + $("#psAvv").css("color"));
            },


            //funzione per mostrare sulla gui il ritiro del pokemon attivo dell'avversario dalla lotta
            eseguiAnimazioneRitiroAvv: function() {
                $("#spriteAvv").css("transition", "transform 3s");
                $("#spriteAvv").css("transform", "scale(0.2)");

                var avv = this.avversario;

                setTimeout(function() {
                    $("#spriteAvv").css("transition", "transform 0s");
                    $("#spriteAvv").css("transform", "scale(1)");

                    avv.indexSprite = 1;
                }, 2300);                
            },


            //metodo per mostrare sulla gui il mandare il pokemon dell'avversario in campo
            eseguiAnimazioneSwitchAvv: function() {
                this.avversario.indexSprite = 0;
                
                $("#spriteAvv").css("transition", "transform 0s");
                $("#spriteAvv").css("transform", "scale(0.2)");
                                
                setTimeout(function() {
                    $("#spriteAvv").css("transition", "transform 3s");
                    $("#spriteAvv").css("transform", "scale(1)");
                }, 100);
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

    mioVue.aggiungiPkmPrt(6);
    mioVue.aggiungiMossa(10, mioVue.primoPkmPrt);
    mioVue.aggiungiMossa(13, mioVue.primoPkmPrt);
    mioVue.aggiungiMossa(7, mioVue.primoPkmPrt);
    mioVue.aggiungiMossa(40, mioVue.primoPkmPrt);

    mioVue.aggiungiPkmPrt(5);
    mioVue.aggiungiMossa(10, mioVue.secondoPkmPrt);
    mioVue.aggiungiMossa(13, mioVue.secondoPkmPrt);
    mioVue.aggiungiMossa(7, mioVue.secondoPkmPrt);
    mioVue.aggiungiMossa(40, mioVue.secondoPkmPrt);

    mioVue.aggiungiPkmPrt(4);
    mioVue.aggiungiMossa(10, mioVue.terzoPkmPrt);
    mioVue.aggiungiMossa(13, mioVue.terzoPkmPrt);
    mioVue.aggiungiMossa(7, mioVue.terzoPkmPrt);
    mioVue.aggiungiMossa(40, mioVue.terzoPkmPrt);
    
    mioVue.aggiungiPkmPrt(3);
    mioVue.aggiungiMossa(28, mioVue.quartoPkmPrt);
    mioVue.aggiungiMossa(13, mioVue.quartoPkmPrt);
    mioVue.aggiungiMossa(19, mioVue.quartoPkmPrt);
    mioVue.aggiungiMossa(58, mioVue.quartoPkmPrt);

    mioVue.aggiungiPkmPrt(2);
    mioVue.aggiungiMossa(28, mioVue.quintoPkmPrt);
    mioVue.aggiungiMossa(13, mioVue.quintoPkmPrt);
    mioVue.aggiungiMossa(19, mioVue.quintoPkmPrt);
    mioVue.aggiungiMossa(58, mioVue.quintoPkmPrt);
    
    mioVue.aggiungiPkmPrt(1);
    mioVue.aggiungiMossa(28, mioVue.sestoPkmPrt);
    mioVue.aggiungiMossa(13, mioVue.sestoPkmPrt);
    mioVue.aggiungiMossa(19, mioVue.sestoPkmPrt);
    mioVue.aggiungiMossa(58, mioVue.sestoPkmPrt);



    mioVue.avversario.username = "Blue";

    mioVue.aggiungiPkmAvv(3);
    mioVue.aggiungiMossa(28, mioVue.primoPkmAvv);
    mioVue.aggiungiMossa(13, mioVue.primoPkmAvv);
    mioVue.aggiungiMossa(19, mioVue.primoPkmAvv);
    mioVue.aggiungiMossa(58, mioVue.primoPkmAvv);

    mioVue.aggiungiPkmAvv(2);
    mioVue.aggiungiMossa(28, mioVue.secondoPkmAvv);
    mioVue.aggiungiMossa(13, mioVue.secondoPkmAvv);
    mioVue.aggiungiMossa(19, mioVue.secondoPkmAvv);
    mioVue.aggiungiMossa(58, mioVue.secondoPkmAvv);

    mioVue.aggiungiPkmAvv(1);
    mioVue.aggiungiMossa(28, mioVue.terzoPkmAvv);
    mioVue.aggiungiMossa(13, mioVue.terzoPkmAvv);
    mioVue.aggiungiMossa(19, mioVue.terzoPkmAvv);
    mioVue.aggiungiMossa(58, mioVue.terzoPkmAvv);

    mioVue.aggiungiPkmAvv(6);
    mioVue.aggiungiMossa(10, mioVue.quartoPkmAvv);
    mioVue.aggiungiMossa(13, mioVue.quartoPkmAvv);
    mioVue.aggiungiMossa(7, mioVue.quartoPkmAvv);
    mioVue.aggiungiMossa(40, mioVue.quartoPkmAvv);

    mioVue.aggiungiPkmAvv(5);
    mioVue.aggiungiMossa(10, mioVue.quintoPkmAvv);
    mioVue.aggiungiMossa(13, mioVue.quintoPkmAvv);
    mioVue.aggiungiMossa(7, mioVue.quintoPkmAvv);
    mioVue.aggiungiMossa(40, mioVue.quintoPkmAvv);

    mioVue.aggiungiPkmAvv(4);
    mioVue.aggiungiMossa(10, mioVue.sestoPkmAvv);
    mioVue.aggiungiMossa(13, mioVue.sestoPkmAvv);
    mioVue.aggiungiMossa(7, mioVue.sestoPkmAvv);
    mioVue.aggiungiMossa(40, mioVue.sestoPkmAvv);
});

