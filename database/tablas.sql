CREATE TABLE usuario(
id_usuario SERIAL PRIMARY KEY,
nombre VARCHAR(50) NOT NULL,
correo VARCHAR(100) UNIQUE NOT NULL,
contrasena VARCHAR(100) NOT NULL,
rol VARCHAR(20) DEFAULT 'usuario'
);

CREATE TABLE visita(
id_visita SERIAL PRIMARY KEY,
fecha_visita DATE NOT NULL,
tipo_visita VARCHAR(100),
id_usuario INT,

CONSTRAINT fk_usuario
FOREIGN KEY(id_usuario)
REFERENCES usuario(id_usuario)
);

CREATE TABLE comentario(
id_comentario SERIAL PRIMARY KEY,
contenido TEXT NOT NULL,
fecha_comentario TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
id_usuario INT,

CONSTRAINT fk_usuario
FOREIGN KEY(id_usuario)
REFERENCES usuario(id_usuario)
);

CREATE TABLE evento(
id_evento SERIAL PRIMARY KEY,
titulo VARCHAR(100) NOT NULL,
descripcion TEXT NOT NULL,
fecha_evento DATE NOT NULL,
imagen VARCHAR(255)
);

CREATE TABLE sector(
id_sector SERIAL PRIMARY KEY,
nombre VARCHAR(100) NOT NULL,
ubicacion_sector VARCHAR(255) NOT NULL,
cantidad_sepulturas INT NOT NULL,
metros_cuadrados INT NOT NULL
);

CREATE TABLE sepultura(
id_sepultura SERIAL PRIMARY KEY,
ubicacion_sepultura VARCHAR(255) NOT NULL,
estado VARCHAR(20) NOT NULL,
id_sector INT,

CONSTRAINT fk_sector
FOREIGN KEY(id_sector)
REFERENCES sector(id_sector)
);

CREATE TABLE fallecido(
id_fallecido SERIAL PRIMARY KEY,
nombre VARCHAR(100) NOT NULL,
fecha_nacimiento DATE NOT NULL,
fecha_fallecimiento DATE NOT NULL,
biografia TEXT NOT NULL,
id_sepultura INT,

CONSTRAINT fk_sepultura
FOREIGN KEY(id_sepultura)
REFERENCES sepultura(id_sepultura)
);