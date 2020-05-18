var bat;
var battVue;
var sfidaVue;
var avv;
var bcp;
var objCPU;


function fetchBattlePage() {
    return fetch("/battle/battle.html")
        .then(response => {
            return response.text()
        })
        .then(data => {
            document.body.innerHTML = data;
        }).then(
            () => {
                return fetch("/lib/js/battaglia/battvue.js");
            }
        ).then(response => {
            return response.text()
        })
        .then(data => {
            eval(data);
        }).then(() => {
            console.log(battVue);
            battVue.inizializzaVue(bcp, user, avv);
            bat = new Battaglia(battVue, objCPU);
            objCPU = bat.cpu;
            closeModal();
        });
}

function fetchEsitoPage(risultato) {
    return fetch("/battle/esito.php?risultato=" + risultato)
        .then(response => {
            return response.text()
        })
        .then(data => {
            document.body.innerHTML = data;
        }).then(
            () => {
                return fetch("/lib/js/navbar.js");
            }
        ).then(response => {
            return response.text()
        })
        .then(data => {
            eval(data);
        });
}

function gestisciRisposta(msg) {
    obj = JSON.parse(msg);
    switch (obj.type) {
        case "battle":  // gestione battaglia 
            if (bat != undefined) { // battle not yet started 
                var toBat = JSON.stringify(obj.value);
                bat.gestisciBattaglia(toBat);
            }
            else { //change page 
                fetchBattlePage().then(() => {
                    var toBat = JSON.stringify(obj.value);
                    bat.gestisciBattaglia(toBat);
                });
            }
            break;
        case "update":  // update users in page 
            obj.value.splice(obj.value.indexOf(user), 1);
            sfidaVue.aggiornaUtenti(obj.value);
            break;
        case "request":  // battle request not accepted close 
            sendModalComm("Sfida in arrivo", "sei stato sfidato da "+obj.value.sender+" allenatore", 
            "Acceto", "Cancella", "Caricando...",()=>{
                avv=obj.value.sender;
                bcp.sendAccept(obj.value.sender);
            }, ()=>{ bcp.sendRefuse(obj.value.sender); });
            break;

        case "refuse":  // battle request not accepted close 
            UpdateModal("Richiesta Rifiutata","L'allenatore "+obj.value.sender+" ha rifiutato la tua sfida.");
            break;
        case "error":
            UpdateModal("ERROR",obj.value);
            break
        default:
            console.log(msg);
    }
}

//metodo che manda all'avversario una richiesta di sfida
function gestisciRichiesta(usrnm) {
    avv = usrnm;
    if (usrnm == "CPU") {
        sendModalComm("Richiesta di Sfida", "Vuoi sfidare CPU allenatore?", "Si", "No", "Caricando...", ()=>{fetchBattlePage();}, ()=>{});
    } else {
        sendModalComm("Richiesta di Sfida", "Vuoi sfidare "+avv+" allenatore?", "Si", "No", "Caricando...", 
                        ()=>{bcp.sendRequest(avv);}, 
                        ()=>{bcp.cancel();});
    }
    //se è CPU vai direttamente in battaglia
    //altrimenti aspetta per un tot di tempo una risposta, se positiva vai in battaglia altrimenti no
}


function gesticiRivincita(){
    sendModalComm("Richiesta di Rivincita", "Vuoi sfidare "+avv+" allenatore ad una rivincita?", "Si", "No", "Caricando...", 
    ()=>{bcp.sendRequest(avv);}, 
    ()=>{bcp.cancel();});
}


var team = JSON.parse(localStorage.squadra);

bcp = new BCPController(user, team, gestisciRisposta);