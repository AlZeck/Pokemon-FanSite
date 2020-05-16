var bat;

function gestisciRisposta(msg) {
    obj = JSON.parse(msg);
    if(obj.type == "battle"){
        var toBat = JSON.stringify(obj.value);
        bat.gestisciBattaglia(toBat);
    }
    else {
        console.log(msg);
    }
}

/*
    var bcp = new BCPController("Red", JJ.squadra, gestisciRisposta);
    battVue.bcpc = bcp;
    bat = new Battaglia(battVue);
*/