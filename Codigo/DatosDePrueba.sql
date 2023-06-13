INSERT INTO Login(nombre_usuario, email,contrasena)
      	VALUES ("Pepe", "PepeArgento@gmail.com.ar", "Fatiga123");

INSERT INTO Login(nombre_usuario, email,contrasena)
        VALUES ("Agus", "agustinloser@gmail.com.ar", "1234312");

INSERT INTO Usuario(id_user,nombre_usuario, email,lista_seguidos,lista_seguidores,descripcion,foto_perfil)
 	VALUES (1, "pepe", "Pepeargento@gmail.com", 2, 3, "Pepe es una padre de familia y trabajador en una zapateria", NULL );

INSERT INTO Usuario(id_user,nombre_usuario, email,lista_seguidos,lista_seguidores,descripcion,foto_perfil)
	VALUES (8, "Agus", "agustinloser@gmail.com.ar", 6, 4, "Adicto al juego", NULL );

INSERT INTO Likes(lista_likes, id_user, id_publicacion)
	VALUES (4,1,5);

INSERT INTO Likes(lista_likes, id_user, id_publicacion)
        VALUES (2,11,4);

INSERT INTO Publicaciones(id_publicacion,id_user,lista_likes,imagenes,fecha)
	VALUES (5,1,4,NULL,"11-6-21");

INSERT INTO Publicaciones(id_publicacion,id_user,lista_likes,imagenes,fecha)
        VALUES (3,18,5,NULL,"1-6-98");

INSERT INTO Comentarios(id_comentario,id_user,id_publicacion,lista_likes,imagenes,fecha)
	VALUES (6,1,5,4,NULL,"21-8-15");

INSERT INTO Comentarios(id_comentario,id_user,id_publicacion,lista_likes,imagenes,fecha)
        VALUES (19,3,32,1,NULL,"2-3-21");

INSERT INTO Seguidos(lista_seguidos,id_user)
	VALUES (2,1);

INSERT INTO Seguidos(lista_seguidos,id_user)
        VALUES (3,6);

INSERT INTO Seguidores(lista_seguidores,id_user)
	VALUES (3,1);

INSERT INTO Seguidores(lista_seguidores,id_user)
        VALUES (12,8);
