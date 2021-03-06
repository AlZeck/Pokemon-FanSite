//funzione per prendere dal DB un pokemon o una mossa o il moveset di un pokemon (specificato con stringa omonima in parametro "cosa") tramite loro id

function prendiDalDB(cosa, id) {
    var ret;

    $.ajax({
        url: "/lib/php/battleInfo.php?type=" + cosa + "&id=" + id,
        async: false,
        dataType: 'json',
        success: function (response) {
            if(cosa == "pokemon") {
                ret = {
                    id: parseInt(response.id),
                    nome: response.nome.charAt(0).toUpperCase() + response.nome.slice(1),
                    tipo1: response.tipo1,
                    tipo2: response.tipo2,
                    uber: response.uber,
                    psMax: parseInt(response.ps),
                    ps: parseInt(response.ps),
                    att: parseInt(response.att),
                    dif: parseInt(response.dif),
                    atts: parseInt(response.attsp),
                    difs: parseInt(response.difsp),
                    vel: parseInt(response.vel),
                    artwork: "/assets/pokemon/artwork/" + response.nome + ".png",
                    mini_sprite: "/assets/pokemon/mini_sprite/" + response.nome + ".png",
                    front_sprite: "/assets/pokemon/front_sprite/" + response.nome + ".gif",
                    back_sprite: "/assets/pokemon/back_sprite/" + response.nome + ".gif",
                    mosse: []
                };
            }

            else if(cosa == "mossa") {
                ret = {
                    id: parseInt(response.id),
                    nome: response.nome,
                    tipo: response.tipo,
                    potenza: parseInt(response.potenza),
                    precisione: parseInt(response.precisione),
                    categoria: response.categoria
                };
            }

            else {
                var i;
                for(i=0; i<response.length; i++) {
                    response[i].id = parseInt(response[i].id);
                    response[i].potenza = parseInt(response[i].potenza);
                    response[i].precisione = parseInt(response[i].precisione);
                }

                ret = response;
            }
        }
    });

    return ret;
}
