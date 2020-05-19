//funzione per controllare che il pokemon non ci sia già (per squadra casuale)
function pkmAlreadyHere(id, squadra) {
    var i;
    for(i=0; i<squadra.length; i++) if(id == squadra[i].id) return true;
    return false;
};


//funzione per controllare che la mossa del pokemon passato non ci sia già (per squadra casuale)
function mossaAlreadyHere(id, pkm) {
    if(pkm.mosse.includes(id)) return true;
    else return false;
};


//funzione per prendere un pokemon dato l'id dal db (undefined se non va bene) (per squadra casuale)
function prendiPkm(id, numeroUber) {    
    var ret = undefined;

    $.ajax({
        url: "/lib/php/battleInfo.php?type=pokemon&id=" + id,
        async: false,
        dataType: 'json',
        success: function (response) {
            //controlla che non ci siano più di due uber
            if(! (response.uber && numeroUber > 1)) {
                if(response.uber) numeroUber++;

                ret = {
                    id: parseInt(response.id),
                    mosse: []
                };
            }
        }
    });

    return [ret, numeroUber];
};


//funzione per dare un moveset di tutte mosse diverse ad un oggetto pokemon passato (per squadra casuale)
function prendiMoveset(pkm) {
    var moveset = prendiDalDB("moveset", pkm.id);

    while(pkm.mosse.length < 4) {
        var rand = Math.floor(Math.random() * moveset.length);
        var mossaID = moveset[rand].id;

        if(! mossaAlreadyHere(mossaID, pkm)) pkm.mosse.push(mossaID);
    }
};


//funzione per creare casualmente la squadra con le mosse (non più di 2 uber e tutti diversi e mosse diverse per pokemon)
//la squadra è un array di sei oggetti pokemon del tipo {"id": id_pkm, "mosse": [id_mossa1, id_mossa2, id_mossa3, id_mossa4]}
//esattamente come nel messaggio di inizializzazione da inviare al server
function creaSquadra() {
    var squadra = [];
    var numeroUber = 0;

    var i;
    for(i=0; i<6; i++) {
        var P = undefined;

        //prendo il pokemon
        do {
            var rand = Math.floor(Math.random() * 649) + 1;     //prendo un id di un pokemon da 1 a 649
            if(pkmAlreadyHere(rand, squadra)) continue;

            [P, numeroUber] = prendiPkm(rand, numeroUber);
        } while(P == undefined);

        //gli fornisco un moveset
        prendiMoveset(P);
        
        //aggiungo elemento alla squadra
        squadra.push(P);
    }

    return squadra;
};
