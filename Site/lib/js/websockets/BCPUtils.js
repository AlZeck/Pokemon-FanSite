var bat;
var battVue;
var sfidaVue;

function gestisciRisposta(msg) {
    obj = JSON.parse(msg);
    if(obj.type == "battle"){
        var toBat = JSON.stringify(obj.value);
        bat.gestisciBattaglia(toBat);
    }
    else {
        //TODO controlla i altri casi
        console.log(msg);
    }
}

/*
    var bcp = new BCPController("Red", JJ.squadra, gestisciRisposta);
    battVue.bcpc = bcp;
    bat = new Battaglia(battVue);
*/

//metodo che manda all'avversario una richiesta di sfida
function gestisciRichiesta(usrnm) {
    //TODO
    //se è CPU vai direttamente in battaglia
    //altrimenti aspetta per un tot di tempo una risposta, se positiva vai in battaglia altrimenti no
}