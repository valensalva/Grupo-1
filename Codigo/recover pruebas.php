<?php
   
    //RECOVER
	if ( isset($_POST['submit']) ) {
		$usr= $_POST["usuario"];
        $psw_n= $_POST["psw_n"];
        $psw_n2= $_POST["psw_n2"];
        $query="SELECT nombre FROM usuario WHERE nombre='$usr'";
        $update= "UPDATE usuario SET contraseña= '$psw_n' WHERE nombre= '$usr'";

        $connect=mysqli_connect('localhost', 'id20946012_roots', 'Roots123+', 'id20946012_mydb');
        mysqli_set_charset($connect, 'utf8');
        
        $res=mysqli_query($connect, $query);
        $array = mysqli_fetch_array($res);
        
        if( $psw_n == $psw_n2){ //Verifica que ambas contraseñas sean iguales
            if( is_null($array) ) { //Si la respuesta de la primer query esta vacia, entonces el usuario no existe
                echo "Este mail no es de ningun usuario"; // Se ingresa la query de ingreso de usuario 
            } else { //Si la respuesta de la primer query devuelve algo, es que el usuario existe
                mysqli_query($connect, $update); // Se cambia la contraseña nueva por la anterior
                header("Location: ../index.php");
            }
        }else{
            echo "Sos boludo";
        }
        
	}
    /*
    if ( isset($_POST['submit']) ) {
		$usr = $_POST['usuario'];
        $contra = $_POST['contra'];
        
        
        $query="SELECT nombre FROM usuario WHERE nombre='$usr' AND contraseña='$contra'";
        $query2="SELECT * FROM usuario";

        $conexion=mysqli_connect('localhost', 'id20936643_matu', 'MuyBuen@s123', 'id20936643_almacenmary');
        mysqli_set_charset($conexion, 'utf8');
        
        $res=mysqli_query($conexion, $query);
        $array = mysqli_fetch_array($res, MYSQLI_NUM);
        
        
        if( is_null($array) ) {
            
            echo "N se entro"; 
            
        } else {
            #echo "$array[0], $array[1]";
            
            header('Location: ../admin.php');
        }
	}
	
    #$query ="INSERT INTO usuario(nombre, contraseña) VALUES ($usr, $usr);"
    */
?>
