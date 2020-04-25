// JAVASCRIPT GENERALI USATI IN TUTTE LE PAGINE


//array usati per ricercare contenuto del sito
var leggendari = new Array("regice","regigigas", "regirock", "registeel", "meloetta");
var tipi = new Array("normale","fuoco", "acqua", "elettro", "erba", "ghiaccio", "lotta", "veleno", "terra", "volante", "psico", "coleottero", "roccia", "spettro", "drago", "buio", "acciaio", "folletto");


//inserisco qui dentro gli event listener da rendere pronti al caricamento (load) della pagina corrente
window.addEventListener("load", function() {
	document.getElementById("pulsantePokeballID").addEventListener( "click", ricerca );

	document.getElementById("ricercaID").addEventListener( "keyup", function(event){ if(event.keyCode == 13) ricerca(); } );
});
