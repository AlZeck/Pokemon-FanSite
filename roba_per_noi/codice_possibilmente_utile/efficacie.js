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
