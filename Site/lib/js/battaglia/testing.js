//esempi messaggi json che arrivano al client
//da provare scambiando gli utenti anche

var A = {
    "primo": {
			"utente": "Red",
			"azione": "mossa_attesa",
			"valore": 13,
			"danno": 1000,
            "comunicato": "Brutto Colpo!"
    },
    "secondo": {
            "utente": "Blue",
            "azione": "_switch",
            "valore": 0,
            "danno": 0,
            "comunicato": ""
    }
};

var B = {
    "primo": {
			"utente": "Red",
			"azione": "mossa_vinto",
			"valore": 13,
			"danno": 1000,
            "comunicato": "Superefficace!"
    },
    "secondo": {
            "utente": "Blue",
            "azione": "_perso",
            "valore": 0,
            "danno": 0,
            "comunicato": ""
    }
};

var C = {
    "primo": {
			"utente": "Red",
			"azione": "mossa_switch",
			"valore": 13,
			"danno": 1,
            "comunicato": "Superefficace!"
    },
    "secondo": {
            "utente": "Blue",
            "azione": "mossa_attesa",
            "valore": 13,
            "danno": 1000,
            "comunicato": "Brutto colpo!"
    }
};

var D = {
    "primo": {
			"utente": "Red",
			"azione": "mossa_perso",
			"valore": 13,
			"danno": 1,
            "comunicato": "Superefficace!"
    },
    "secondo": {
            "utente": "Blue",
            "azione": "mossa_vinto",
            "valore": 13,
            "danno": 1000,
            "comunicato": "Brutto colpo!"
    }
};

var E = {
    "primo": {
			"utente": "Red",
			"azione": "mossa_",
			"valore": 13,
			"danno": 1,
            "comunicato": "Superefficace!"
    },
    "secondo": {
            "utente": "Blue",
            "azione": "mossa_",
            "valore": 13,
            "danno": 1,
            "comunicato": "Brutto colpo!"
    }
};

var F = {
    "primo": {
			"utente": "Red",
			"azione": "switch_switch",
			"valore": 1,
			"danno": 0,
            "comunicato": ""
    },
    "secondo": {
            "utente": "Blue",
            "azione": "mossa_attesa",
            "valore": 13,
            "danno": 1000,
            "comunicato": "Superefficace!"
    }
};

var G = {
    "primo": {
			"utente": "Red",
			"azione": "switch_",
			"valore": 1,
			"danno": 0,
            "comunicato": ""
    },
    "secondo": {
            "utente": "Blue",
            "azione": "mossa_",
            "valore": 13,
            "danno": 1,
            "comunicato": "Superefficace!"
    }
};

var H = {
    "primo": {
			"utente": "Red",
			"azione": "switch_",
			"valore": 1,
			"danno": 0,
            "comunicato": ""
    },
    "secondo": {
            "utente": "Blue",
            "azione": "switch_",
            "valore": 1,
            "danno": 0,
            "comunicato": ""
    }
};

var I = {
    "primo": {
			"utente": "Red",
			"azione": "switch_",
			"valore": 1,
			"danno": 0,
            "comunicato": ""
    },
    "secondo": {
            "utente": "Blue",
            "azione": "attesa_",
            "valore": 0,
            "danno": 0,
            "comunicato": ""
    }
};

var J = {
    "primo": {
			"utente": "Red",
			"azione": "forfeit_perso",
			"valore": 0,
			"danno": 0,
            "comunicato": ""
    },
    "secondo": {
            "utente": "Blue",
            "azione": "forfeit_perso",
            "valore": 0,
            "danno": 0,
            "comunicato": ""
    }
};

var K = {
    "primo": {
			"utente": "Red",
			"azione": "forfeit_perso",
			"valore": 0,
			"danno": 0,
            "comunicato": ""
    },
    "secondo": {
            "utente": "Blue",
            "azione": "_vinto",
            "valore": 0,
            "danno": 0,
            "comunicato": ""
    }
};


//---------------------------------------------------------------------------------------------------


//funzione per prendere dal DB un pokemon o una mossa (specificato con stringa omonima in parametro "cosa") tramite loro id

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
                    psMax: parseInt(response.ps),
                    ps: parseInt(response.ps),
                    att: parseInt(response.att),
                    dif: parseInt(response.dif),
                    atts: parseInt(response.attsp),
                    difs: parseInt(response.difsp),
                    vel: parseInt(response.vel), 
                    mini_sprite: "/assets/pokemon/mini_sprite/" + response.nome + ".png",
                    front_sprite: "/assets/pokemon/front_sprite/" + response.nome + ".gif",
                    back_sprite: "/assets/pokemon/back_sprite/" + response.nome + ".gif",
                    mosse: []
                };
                
            }
            else {
                ret = {
                    id: parseInt(response.id),
                    nome: response.nome,
                    tipo: response.tipo,
                    potenza: parseInt(response.potenza),
                    precisione: parseInt(response.precisione),
                    categoria: response.categoria
                };
            }
        }
    });

    return ret;
}
