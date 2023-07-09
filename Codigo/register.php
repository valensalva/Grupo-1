<?php
	//REGISTER
	if ( isset($_POST['boton']) ) {
		$usr= $_POST["usr"];
    	$psw= $_POST["psw"];
    	$psw2= $_POST["psw2"];
        $email= $_POST["email"];
        
        
        $query= "SELECT * FROM Login WHERE nombre_usuario = '$usr' OR email= '$email'";
		$insert= "INSERT INTO Login(nombre_usuario, email, contraseña) VALUES ('$usr', '$email', '$psw')";

        $connect=mysqli_connect('localhost', 'id20946012_roots', 'Roots123+', 'id20946012_mydb');
        mysqli_set_charset($connect, 'utf8');
        
        $res=mysqli_query($connect, $query);
        $array = mysqli_fetch_array($res);
        
        
        if( is_null($array) ) { //Si la respuesta de la primer query esta vacia, entonces el usuario no existe
			if($psw == $psw2){
			    mysqli_query($connect, $insert);    // Se ingresa la query de ingreso de usuario
			    header("Location: ../principal/principal.html");
			} else{
			    echo "las contraseñas son distintas";
			}
        } else { //Si la respuesta de la primer query devuelve algo, es que el usuario existe
            echo "Este usuario ya existe";
        }
        mysqli_close($connect);
	}
?>