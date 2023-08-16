<?php    
    include '../conexion.php';
   
    $query="SELECT nombre, id_rol FROM usuario";

    $result = conexion($query);
    
    // Crear un array para almacenar los resultados
    $array_ajax = array();
    
    // Obtener los datos de la consulta y agregarlos al array
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $array_ajax[] = $row;
        }
    }
    
    echo json_encode($array_ajax);
?>