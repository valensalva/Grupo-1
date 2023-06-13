CREATE TABLE Usuario(id_user INT(6) PRIMARY KEY,
                     nombre_usuario VARCHAR(20),
                     email VARCHAR(60),
                     lista_seguidos VARCHAR(300),
                     lista_seguidores VARCHAR(300),
                     descripcion VARCHAR(300),
                     foto_perfil IMAGE,
                     FOREIGN KEY(nombre_usuario) REFERENCES Login(nombre_usuario),
                     FOREIGN KEY(email) REFERENCES Login(email)
                     FOREIGN KEY(lista_seguidos) REFERENCES Seguidos(lista_seguidos),
                     FOREIGN KEY(lista_seguidores) REFERENCES Seguidores(lista_seguidores));
                     
                     
CREATE TABLE Login(nombre_usuario VARCHAR(20) PRIMARY KEY,
                   email VARCHAR(60) PRIMARY KEY,
                   contrasena VARCHAR(30));
                   
CREATE TABLE Likes(lista_likes VARCHAR(300) PRIMARY KEY,
                   id_user INT(6),
                   id_publicacion INT(6),
                   imagenes IMAGE,
                   FOREIGN KEY (id_user) REFERENCES Usuario(id_user)
                   FOREIGN KEY (id_publicacion) REFERENCES Publicaciones(id_publicacion));
                   
CREATE TABLE Publicaciones(id_publicacion INT(6) PRIMARY KEY,
                           id_user INT(6),
                           lista_likes VARCHAR(300),
                           imagenes IMAGE,
                           fecha DATETIME,
                           FOREIGN KEY (id_user) REFERENCES Usuario(id_user),
                           FOREIGN KEY(lista_likes) REFERENCES Likes(lista_likes));
                           
CREATE TABLE Comentarios(id_comentario INT(6) PRIMARY KEY,
                         id_publicacion INT(6),
                         id_user INT(6),
                         lista_likes VARCHAR(300),
                         imagenes IMAGE,
                         fecha DATETIME,
                        FOREIGN KEY (id_publicacion) REFERENCES Publicaciones(id_publicaciones),
                        FOREIGN KEY (id_user) REFERENCES Usuario(id_user));
                         
CREATE TABLE Seguidos(lista_seguidos VARCHAR(300) PRIMARY KEY,
                      id_user INT(6),
                     FOREIGN KEY (id_user) REFERENCES Usuario(id_user));
                      
CREATE TABLE Seguidores(lista_seguidores VARCHAR(300) PRIMARY KEY,
                        id_user INT(6),
                       FOREIGN KEY (id_user) REFERENCES Usuario(id_user));
