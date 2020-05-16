//esempi messaggi json che arrivano al client
//da provare scambiando gli username anche

var A = {
    "primo": {
			"utente": "Red",
			"azione": "mossa_attesa",
			"valore": 13,
			"danno": 1000,
            "comunicato": "Il colpo è andato a segno. Brutto colpo!"
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
            "comunicato": "Il colpo è stato superefficace!"
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
            "comunicato": "Il colpo è stato superefficace!"
    },
    "secondo": {
            "utente": "Blue",
            "azione": "mossa_attesa",
            "valore": 13,
            "danno": 1000,
            "comunicato": "Il colpo è andato a segno. Brutto colpo!"
    }
};

var D = {
    "primo": {
			"utente": "Red",
			"azione": "mossa_perso",
			"valore": 13,
			"danno": 1,
            "comunicato": "Il colpo è stato superefficace!"
    },
    "secondo": {
            "utente": "Blue",
            "azione": "mossa_vinto",
            "valore": 13,
            "danno": 1000,
            "comunicato": "Il colpo è andato a segno. Brutto colpo!"
    }
};

var E = {
    "primo": {
			"utente": "Red",
			"azione": "mossa_",
			"valore": 13,
			"danno": 0,
            "comunicato": "La mossa è stata schivata!"
    },
    "secondo": {
            "utente": "Blue",
            "azione": "mossa_",
            "valore": 13,
            "danno": 1,
            "comunicato": "Il colpo è andato a segno. Brutto colpo!"
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
            "comunicato": "Il colpo è stato superefficace!"
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
            "comunicato": "Il colpo è stato superefficace!"
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


//----------------------------------------------------------------------------


var JJ = {
    "squadra": [
        {
            "id": 6,
    
            "mosse": [
                10,
                13,
                7,
                40
            ]
        },

        {
            "id": 5,

            "mosse": [
                10,
                13,
                7,
                40
            ]
        },

        {
            "id": 4,

            "mosse": [
                10,
                13,
                7,
                40
            ]
        },

        {
            "id": 3,

            "mosse": [
                28,
                13,
                19,
                58
            ]
        },

        {
            "id": 2,

            "mosse": [
                28,
                13,
                19,
                58
            ]
        },

        {
            "id": 1,

            "mosse": [
                28,
                13,
                19,
                58
            ]
        }
    ]
};