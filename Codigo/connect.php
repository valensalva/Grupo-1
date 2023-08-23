<?php
    function conexion($query) {
        $conexion=mysqli_connect('localhost', 'root', '', 'id20946012_mydb');
        mysqli_set_charset($conexion, 'utf8');
        

        $res = mysqli_query($conexion, $query);


        mysqli_close($conexion);

        return $res;
    }
?>