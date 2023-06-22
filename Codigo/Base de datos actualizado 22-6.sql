CREATE TABLE Usuario(id_user INT(6) PRIMARY KEY,
                     nombre_usuario VARCHAR(20),
                     email VARCHAR(60),
                     descripcion VARCHAR(300),
                     foto_perfil IMAGE,
                     FOREIGN KEY(nombre_usuario) REFERENCES Login(nombre_usuario),
                     FOREIGN KEY(email) REFERENCES Login(email));
                     
                     
CREATE TABLE Login(nombre_usuario VARCHAR(20) PRIMARY KEY,
                   email VARCHAR(60) PRIMARY KEY,
                   contrasena VARCHAR(30));
                   
CREATE TABLE Likes(id_like INT(6),
                   id_publicacion INT(6),
                   FOREIGN KEY(id_like) REFERENCES Usuario(id_user),
                   FOREIGN KEY(id_publicacion) REFERENCES Publicacion(id_publicacion));
                   
CREATE TABLE Publicacion(id_publicacion INT(6) PRIMARY KEY,
                         id_user INT(6),
                         lista_likes VARCHAR(300),
                         imagenes IMAGE,
                         fecha DATETIME,
                         FOREIGN KEY (id_user) REFERENCES Usuario(id_user));
                           
CREATE TABLE Comentario(id_comentario INT(6) PRIMARY KEY,
                        id_user INT(6),
                        id_publicacion INT(6),
                        imagenes IMAGE,
                        fecha DATETIME,
                        FOREIGN KEY (id_publicacion) REFERENCES Publicacion(id_publicacion),
                        FOREIGN KEY (id_user) REFERENCES Usuario(id_user));