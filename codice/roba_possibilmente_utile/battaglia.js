//array per ricavare dal nome del tipo il suo indice
const tipi = new Array("normale", "fuoco", "acqua", "elettro", "erba", "ghiaccio", "lotta", "veleno", "terra", "volante", "psico", "coleottero", "roccia", "spettro", "drago", "buio", "acciaio", "folletto");

//costante "metà" per indicare la poca efficacia nella matrice sottostante (per simmetria)
const m = 0.5;

//matrice delle efficacie dei tipi (in base a indici dell'array soprastante)
//indice di riga indica attaccante, indice di colonna difensore
const efficacie = new Array(
    new Array(1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, m, 0, 1, 1, m, 1),    //normale
    new Array(1, m, m, 1, 2, 2, 1, 1, 1, 1, 1, 2, m, 1, m, 1, 2, 1),    //fuoco
    new Array(1, 2, m, 1, m, 1, 1, 1, 2, 1, 1, 1, 2, 1, m, 1, 1, 1),    //acqua
    new Array(1, 1, 2, m, m, 1, 1, 1, 0, 2, 1, 1, 1, 1, m, 1, 1, 1),    //elettro
    new Array(1, m, 2, 1, m, 1, 1, m, 2, m, 1, m, 2, 1, m, 1, m, 1),    //erba
    new Array(1, m, m, 1, 2, m, 1, 1, 2, 2, 1, 1, 1, 1, 2, 1, m, 1),    //ghiaccio
    new Array(2, 1, 1, 1, 1, 2, 1, m, 1, m, m, m, 2, 0, 1, 2, 2, m),    //lotta
    new Array(1, 1, 1, 1, 2, 1, 1, m, m, 1, 1, 1, m, m, 1, 1, 0, 2),    //veleno
    new Array(1, 2, 1, 2, m, 1, 1, 2, 1, 0, 1, m, 2, 1, 1, 1, 2, 1),    //terra
    new Array(1, 1, 1, m, 2, 1, 2, 1, 1, 1, 1, 2, m, 1, 1, 1, m, 1),    //volante
    new Array(1, 1, 1, 1, 1, 1, 2, 2, 1, 1, m, 1, 1, 1, 1, 0, m, 1),    //psico
    new Array(1, m, 1, 1, 2, 1, m, m, 1, m, 2, 1, 1, m, 1, 2, m, m),    //coleottero
    new Array(1, 2, 1, 1, 1, 2, m, 1, m, 2, 1, 2, 1, 1, 1, 1, m, 1),    //roccia
    new Array(0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, m, 1, 1),    //spettro
    new Array(1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, m, 0),    //drago
    new Array(1, 1, 1, 1, 1, 1, m, 1, 1, 1, 2, 1, 1, 2, 1, m, 1, m),    //buio
    new Array(1, m, m, m, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, m, 2),    //acciaio
    new Array(1, m, 1, 1, 1, 1, 2, m, 1, 1, 1, 1, 1, 1, 2, 2, m, 1)     //folletto
);


//calcolo efficacia (prende in ingresso già gli indici per la matrice)
function efficacia(tipo_mossa, tipo1_difensore, tipo2_difensore) {
    var eff = efficacie[tipo_mossa][tipo1_difensore] * efficacie[tipo_mossa][tipo2_difensore];

    if(eff == 1) {          //efficacia standard
        return [eff, "Il colpo è andato a segno."];
    }
    else if(eff == 2) {     //superefficacia
        return [eff, "Il colpo è stato superefficace!"];
    }
    else if(eff == 4) {     //iperefficacia
        return [eff, "Il colpo è stato iperefficace!!!"];
    }
    else if(eff == 0.5) {   //poca efficacia
        return [eff, "Il colpo è stato poco efficace!"];
    }
    else if(eff == 0.25) {  //iperefficacia
        return [eff, "Il colpo è stato scarsamente efficace!!!"];
    }
    else {                  //inefficacia   (eff == 0)
        return [eff, "Il colpo è stato inefficace..."];
    }
}


//calcolo stab (same type attack bonus)
function stab(potenza_mossa, tipo_mossa, tipo1_attaccante, tipo2_attaccante) {
    if(tipo_mossa == tipo1_attaccante || tipo_mossa == tipo2_attaccante) return potenza_mossa + (potenza_mossa/2);
    else return potenza_mossa;
}
