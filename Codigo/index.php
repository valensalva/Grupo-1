<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/styles.css">
    <title> Roots </title>
    <script src="https://code.jquery.com/jquery-3.1.1.min.js" integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8="   crossorigin="anonymous"></script>
    <!--<script src="sweetalert2.all.min.js"></script>-->
</head>

<body>

    <div class="formulario">
       <img class="logo" src="images/logo.png"> 
        <form onsubmit="ingreso(this)">

            <input type="text" name="usr" class="email" placeholder="Email" required> <br>
            <input type="password" name="psw" class="passwd" placeholder="Contraseña" required> <br>
            <input type="submit" name="boton" value="Iniciar sesión" class="login"> <br>
            
            <a  href="recover/p-recover.php" class="recover"> ¿Olvidaste tu contraseña? </a> <br><!-- Link de recuperacion de contra -->
            
            <div class="line"></div>
            <p class="middletext"> o </p> 
            <div class="line"></div>
            
            <p> Si no tenes una cuenta, podes crear una </p>
        </form> 
        
        <form>
            <button type="submit" formaction="register/p-register.php" class="register">Crear cuenta</button> 
        </form>
    </div>
    
    <script src="js/main.js"></script>
</body>

</html>