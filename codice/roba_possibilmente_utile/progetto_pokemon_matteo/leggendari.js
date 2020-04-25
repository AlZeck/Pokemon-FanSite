// JAVASCRIPT USATI NELLE PAGINE DEI LEGGENDARI


//chiamo qui dentro le funzioni da fare al caricamento (load) della pagina corrente
window.addEventListener("load", function() {
	controllaParametri();

	nomeCalcoli();
	tipo1Calcoli();
	tipo2Calcoli();

	psCalcoli();
	attCalcoli();
	difCalcoli();
	attsCalcoli();
	difsCalcoli();
	velCalcoli();
	totaleCalcoli();

	artworkCalcoli();
	miniSpriteCalcoli();
});


//funzione per controllare se nei parametri è specificato di caricare una specifica forma disponibile
function controllaParametri() {
	var parametro = location.search.substring(1);
	if(parametro != "") {
		parametro_valore = parseInt(parametro.split("=")[1]);
		if(0 <= parametro_valore && parametro_valore < numForme) flagForma = parametro_valore;
		else location.search = "";
	}
}


//funzione usata nella barra di ricerca
function ricerca() {
	var R = document.getElementById("ricercaID").value.trim().toLowerCase();

	if(leggendari.includes(R)) window.location.href = "./" + R + ".html";
	else if(tipi.includes(R)) window.location.href = "../tipi/" + R + ".html";
	else window.alert("ATTENZIONE: ciò che cerchi non è presente o è stato immesso male!");

	document.getElementById("ricercaID").value = "";
}


function nomeCalcoli() {
	document.getElementById("nomeID").innerHTML = this["nome_valore" + flagForma];
}


function tipo1Calcoli() {
	document.getElementById("tipo1ID").innerHTML = '<A href="../tipi/' + this["tipo1_nome" + flagForma] + '.html" title="' + this["tipo1_nome" + flagForma] + '"> <IMG src="' + this["tipo1_link" + flagForma] + '" alt="' + this["tipo1_nome" + flagForma] + '" width=60 height=20> </A>';
}


function tipo2Calcoli() {
	if(this["tipo2_nome" + flagForma] != "") 
		document.getElementById("tipo2ID").innerHTML = '<A href="../tipi/' + this["tipo2_nome" + flagForma] + '.html" title="' + this["tipo2_nome" + flagForma] + '"> <IMG src="' + this["tipo2_link" + flagForma] + '" alt="' + this["tipo2_nome" + flagForma] + '" width=60 height=20> </A>';
}


function psCalcoli() {
	var percentuale = this["ps_valore" + flagForma] * 100 / 270;
	document.getElementById("psID").innerHTML = '<DIV class="statistiche-ps-valore" style="width: calc(17px + ' + percentuale + '%);"> ' + this["ps_valore" + flagForma] + ' </DIV>';
}


function attCalcoli() {
	var percentuale = this["att_valore" + flagForma] * 100 / 270;
	document.getElementById("attID").innerHTML = '<DIV class="statistiche-att-valore" style="width: calc(17px + ' + percentuale + '%);"> ' + this["att_valore" + flagForma] + ' </DIV>';
}


function difCalcoli() {
	var percentuale = this["dif_valore" + flagForma] * 100 / 270;
	document.getElementById("difID").innerHTML = '<DIV class="statistiche-dif-valore" style="width: calc(17px + ' + percentuale + '%);"> ' + this["dif_valore" + flagForma] + ' </DIV>';
}


function attsCalcoli() {
	var percentuale = this["atts_valore" + flagForma] * 100 / 270;
	document.getElementById("attsID").innerHTML = '<DIV class="statistiche-atts-valore" style="width: calc(17px + ' + percentuale + '%);"> ' + this["atts_valore" + flagForma] + ' </DIV>';
}


function difsCalcoli() {
	var percentuale = this["difs_valore" + flagForma] * 100 / 270;
	document.getElementById("difsID").innerHTML = '<DIV class="statistiche-difs-valore" style="width: calc(17px + ' + percentuale + '%);"> ' + this["difs_valore" + flagForma] + ' </DIV>';
}


function velCalcoli() {
	var percentuale = this["vel_valore" + flagForma] * 100 / 270;
	document.getElementById("velID").innerHTML = '<DIV class="statistiche-vel-valore" style="width: calc(17px + ' + percentuale + '%);"> ' + this["vel_valore" + flagForma] + ' </DIV>';
}


function totaleCalcoli() {
	document.getElementById("totaleID").textContent = this["ps_valore" + flagForma] + this["att_valore" + flagForma] + this["dif_valore" + flagForma] + this["atts_valore" + flagForma] + this["difs_valore" + flagForma] + this["vel_valore" + flagForma];
}


function artworkCalcoli() {
	document.getElementById("artworkID").innerHTML = '<IMG src="' + this["artwork_link" + flagForma] + '" alt="artwork" width=400 height=400 class="bordo-artwork">';
}


function miniSpriteCalcoli() {
	document.getElementById("miniSpriteID").innerHTML = '<IMG src="' + this["mini_sprite_link" + flagForma] + '" alt="mini-sprite" width=50 height=50>';
}


function cambiaForma() {
	flagForma = (flagForma + 1) % numForme;

	nomeCalcoli();
	tipo1Calcoli();
	tipo2Calcoli();

	psCalcoli();
	attCalcoli();
	difCalcoli();
	attsCalcoli();
	difsCalcoli();
	velCalcoli();
	totaleCalcoli();

	artworkCalcoli();
	miniSpriteCalcoli();
}
