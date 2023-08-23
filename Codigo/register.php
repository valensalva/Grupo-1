<?php
	include('../php/connect.php')
	//REGISTER
	if ( isset($_POST['boton']) ) {
		$usr= $_POST["usr"];
    	$psw= $_POST["psw"];
    	$psw2= $_POST["psw2"];
        $email= $_POST["email"];
        
        
        $query= "SELECT * FROM login WHERE nombre_usuario = '$usr' OR email= '$email'";
		$insert= "INSERT INTO login(nombre_usuario, email, contrasena) VALUES ('$usr', '$email', '$psw')";
		$insert2= "INSERT INTO usuario(nombre_usuario, email) VALUES ('$usr', '$email')";
        
        $res= conexion($query)
        $array = mysqli_fetch_array($res);
        
        
        if( is_null($array) ) { //Si la respuesta de la primer query esta vacia, entonces el usuario no existe
			if($psw == $psw2){
			    conexion($insert);
			    conexion($insert2); // Se ingresan las querys de ingreso de usuario
			    header('Location: ../index.php');
			} else{
			    echo "las contraseñas son distintas";
			}
        } else { //Si la respuesta de la primer query devuelve algo, es que el usuario existe
            echo "Este usuario ya existe";
        }
	}
?>