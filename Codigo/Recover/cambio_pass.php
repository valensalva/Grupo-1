<?php
	require 'connect.php';
	require 'functions.php';

	if(empty($_GET['user_id'])){
		header('Location: index.php');
	}
	if (empty($_GET['token'])){
		header('Location: index.php');
	}

	$user_id = $mysqli->real_escape_string($_GET['user_id']);
	$token = $mysqli->real_escape_string($_GET['token']);

	if(!verificaTokenPass($user_id, $token)){
		echo 'No se pudo verificar los Datos';
		exit;
	}
?>
