<?php
	//LOGIN
	if ( isset($_POST['boton']) ) {
		$usr= $_POST["usr"]
    	$psw= $_POST["psw"]
        
        
        $query= "SELECT * FROM Login WHERE nombre_usuario = $usr AND contrasena = $psw";

        $connect=mysqli_connect('localhost', 'id20946012_rootsdba', 'Roots123+', 'id20946012_roots');
        mysqli_set_charset($connect, 'utf8');
        
        $res=mysqli_query($connect, $query);
        $array = mysqli_fetch_array($res);
        
        
        if( is_null($array) ) { //Si la respuesta de la primer query esta vacia, entonces el usuario no existe
			echo "Este usuario no existe"
            header('Location: html/reister.html');
        } else { //Si la respuesta de la primer query devuelve algo, es que el usuario existe
            header('Location: html/principal.html')
        }
        mysqli_close($connect);
	}
?>