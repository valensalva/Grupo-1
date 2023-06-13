SELECT * FROM Login
	WHERE nombre_usuario = "Pepe"
        
SELECT * FROM Login
	WHERE email = "agustinloser@gmail.com.ar"

SELECT * FROM Login
	WHERE contrasena = "1234312"

SELECT * FROM Usuario
	WHERE id_user = 1 
    	        AND nombre_usuario = "Pepe" 
                or email = "Pepeargento@gmail.com"

SELECT * FROM Usuario
	WHERE id_user = 8
    	        AND lista_seguidos = 6
                AND lista_seguidores = 4

SELECT * FROM Usuario
	INNER JOIN Seguidos
        ON Usuario.id_user=Seguidos.id_user;

SELECT * FROM Usuario
	INNER JOIN Seguidores
        ON Usuario.id_user=Seguidores.id_user;

SELECT * FROM Likes
	INNER JOIN Publicaciones
        ON Likes.lista_likes=Publicaciones.lista_likes;

SELECT * FROM Likes
	INNER JOIN Usuario
        ON Likes.id_user=Usuario.id_user;

SELECT * FROM Publicaciones
	INNER JOIN Usuario
        ON Publicaciones.id_user=Usuario.id_user;

SELECT * FROM Comentarios
	INNER JOIN Likes
        ON Comentarios.lista_likes=Likes.lista_likes;

SELECT * FROM Comentarios
	INNER JOIN Usuario
        ON Comentarios.id_user=Usuario.id_user;

SELECT * FROM Seguidos
	INNER JOIN Usuario
        ON Seguidos.lista_seguidos=Usuario.lista_seguidos;

SELECT * FROM Seguidos
	INNER JOIN Usuario
        ON Seguidos.id_user=Usuario.id_user;

SELECT * FROM Seguidores
	INNER JOIN Usuario
        ON Seguidos.lista_seguidos=Usuario.lista_seguidos;

SELECT * FROM Seguidores
	INNER JOIN Usuario
        ON Seguidos.id_user=Usuario.id_user;
