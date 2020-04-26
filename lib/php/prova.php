<html>
<head>
</head>
<body>

<?php
	//PROGRAMMA PER TESTARE FUNZIONAMENTO GENERALE, LASCIARE QUESTO FILE FINO A NUOVO ORDINE
	include './dbcontroller.php';
	include './battaglia.php';
	
	$dbcon = DBController::getController();

	$pkm1 = $dbcon->getPokemonById(250);
	$mossa1 = $dbcon->getMossaById(250);

	echo $pkm1[0] . " +++ " . $pkm1[1] . " +++ " . $pkm1[2] . " +++ " . $pkm1[3] . " +++ " . $pkm1[4]
	. " +++ " . $pkm1[5] . " +++ " . $pkm1[6] . " +++ " . $pkm1[7] . " +++ " . $pkm1[8] . " +++ " . $pkm1[9] . " +++ " . $pkm1[10];
	
	echo "<BR/> <BR/> <BR/>";

	echo $mossa1[0] . " +++ " . $mossa1[1] . " +++ " . $mossa1[2] . " +++ " . $mossa1[3] . " +++ " . $mossa1[4]
	. " +++ " . $mossa1[5] . " +++ " . $mossa1[6];


	

	/*
	$mossa1 = new Mossa(1, "azione", "normale", "fisico", 50, 100);
	$mossa2 = new Mossa(2, "botta", "normale", "fisico", 50, 100);
	$mossa3 = new Mossa(3, "vorticerba", "erba", "speciale", 150, 100);
	$mossa4 = new Mossa(4, "bora", "ghiaccio", "speciale", 150, 100);

	$pkm1 = new Pokemon(1, "pikachu", "elettro", null, 50, 10, 20, 30, 40, 50, $mossa1, $mossa2, $mossa3, $mossa4);
	$pkm2 = new Pokemon(2, "eevee", "acqua", "volante", 50, 10, 20, 30, 40, 50, $mossa1, $mossa2, $mossa3, $mossa4);

	echo strval($pkm1);
	echo "<BR/><BR/><BR/>";
	echo strval($pkm2);
	*/

	//echo $pkm1->calcoloDanno($mossa3, $pkm2);

?>

</body>