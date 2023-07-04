<?php
	//RECOVER
	if ( isset($_POST['boton']) ) {
		$email= $_POST["email"];
    	$psw_n= $_POST["psw_n"];
        $psw_n2= $_POST["psw_n2"];
        
        $query= "SELECT * FROM Login WHERE email = $email";
		$update= "UPDATE Login SET contrasena= $psw_n WHERE email= $email";

        $connect=mysqli_connect('localhost', 'id20946012_rootsdba', 'Roots123+', 'id20946012_roots');
        mysqli_set_charset($connect, 'utf8');
        
        $res=mysqli_query($connect, $query);
        $array = mysqli_fetch_array($res);
        
        if( $psw_n == $psw_n2){ //Verifica que ambas contraseñas sean iguales
            if( is_null($array) ) { //Si la respuesta de la primer query esta vacia, entonces el usuario no existe
                echo "Este mail no es de ningun usuario"; // Se ingresa la query de ingreso de usuario 
            } else { //Si la respuesta de la primer query devuelve algo, es que el usuario existe
                mysqli_query($connect, $update); // Se cambia la contraseña nueva por la anterior
            }
        }
        mysqli_close($connect);
	}
?>