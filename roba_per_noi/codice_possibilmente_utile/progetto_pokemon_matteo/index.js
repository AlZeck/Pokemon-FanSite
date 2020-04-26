// JAVASCRIPT USATI NELLA PAGINA DI INDEX


//funzione usata nella barra di ricerca
function ricerca() {
	var R = document.getElementById("ricercaID").value.trim().toLowerCase();

	if(leggendari.includes(R)) window.location.href = "./leggendari/" + R + ".html";
	else if(tipi.includes(R)) window.location.href = "./tipi/" + R + ".html";
	else window.alert("ATTENZIONE: ciò che cerchi non è presente o è stato immesso male!");

	document.getElementById("ricercaID").value = "";
}
