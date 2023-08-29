<?php
	include 'connect.php';
	indlude 'funcs.php';

	$errors = array();

	if(!empty($_POST)){
		$email = $mysqli->real_escape_string($_POST['email']);

		if(!isEmail($email)){
			$errors[] = "Debe ingresarse un mail valido"

		}

		if(emailExiste($email)){
			$user_id = getValor('id_user','usuario', $email);
			$user_name = getValor('nombre_usuario', 'usuario', $email);

			$token = generateTokenPass($user_id);

			$url = 'http://'.$_SERVER['SERVER_NAME'].'/login/cambia_pass.php?user_id='.$user_id.'&token='.$token;

			$asunto = 'Recuperacion de contraseña';
			$cuerpo = "Hola $nombre: <br /><br /> Se ha solicitado un reinicio de contraseña<br /><br /> Pa restaurarla visita la siguiente dirección: <a href='$url'>Cambiar password</a>";

			if(enviarEmail($email, $nombre, $asunto, $cuerpo)){
				echo "Hemos enviado un mail a la direccion $email para reinciar la contrseña. <br />";
				echo "<a href='index.php'>Iniciar sesion</a>";
				exit;
			}else{
				$errors[] = "Error al enviar el mail";
			}
		}else{
			$errors[] = "No existe el correo electronico";
		}
	}

?>
