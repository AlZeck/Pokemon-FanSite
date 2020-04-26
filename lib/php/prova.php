<html>
<head>
</head>
<body>

<?php
	include './dbcontroller.php';
	
	$dbcon = DBController::getController();

	$pkm1 = $dbcon->getPokemonById(1);
	$mossa1 = $dbcon->getMossaById(1);

	echo strval($pkm1) . "<BR/> <BR/> <BR/>" . strval($mossa1);


	
	/*
    $mossa1 = new Mossa(1, "azione", "normale", "fisico", 50, 100);
	$mossa2 = new Mossa(2, "botta", "normale", "fisico", 50, 100);
	$mossa3 = new Mossa(3, "vorticerba", "erba", "speciale", 150, 100);
	$mossa4 = new Mossa(4, "bora", "ghiaccio", "speciale", 150, 100);

	$pkm1 = new Pokemon(1, "pikachu", "elettro", null, 50, 10, 20, 30, 40, 50, $mossa1, $mossa2, $mossa3, $mossa4);
	*/

?>

</body>