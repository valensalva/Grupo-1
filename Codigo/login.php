<?php
    include('php/connect.php');
	//LOGIN
	if(isset($_POST['boton'])){
	    $usr= $_POST["usr"];
		$psw= $_POST["psw"];
        
        $query= "SELECT nombre_usuario FROM login WHERE email= '$usr' AND contrasena ='$psw'";
        $query_id = "SELECT id_user FROM usuario WHERE email= '$usr' AND contrasena ='$psw'";
        
        $res = conexion($query);
        //$connect= mysqli_connect('localhost', 'id20946012_roots', 'Roots123+', 'id20946012_mydb');
        //mysqli_set_charset($connect, 'utf8');
    
        //$res= mysqli_query($connect, $query);
        $array = mysqli_fetch_array($res);
        
        if( is_null($array) ) { //Si la respuesta de la primer query esta vacia, entonces el usuario no existe
    		echo "Este usuario no existe";
        } else{//Si la respuesta de la primer query devuelve algo, es que el usuario existe
            session_start();
            $_SESSION['id'] = conexion($query_id);
            header('Location: ../principal/p-principal.php');
            exit;
        }
	}
    $_SESSION['hola'] = "hOLA";

?>