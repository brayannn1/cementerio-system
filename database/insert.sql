INSERT INTO sector(
nombre,ubicacion_sector,cantidad_sepulturas,metros_cuadrados
)
values
('Sector Norte','Norte',50,5000),
('Sector Sur','Sur', 60,6000);

INSERT INTO sepultura(
ubicacion_sepultura,estado,id_sector
)
values
('Fila A - 01', 'ocupada', 1),
('Fila A - 02', 'ocupada', 1),
('Fila A - 03', 'disponible', 1),
('Fila B - 01', 'ocupada', 2),
('Fila B - 02', 'disponible', 2);

INSERT INTO fallecido(
nombre,fecha_nacimiento,fecha_fallecimiento,biografia,id_sepultura
)
values
('Juan Perez', '1940-05-10', '2020-03-15', 'Profesor de historia.', 1),

('Maria Gonzalez', '1952-09-20', '2021-11-02', 'Reconocida vecina del sector.', 2),

('Carlos Soto', '1935-01-01', '2018-07-10', 'Ex trabajador ferroviario.', 4);

INSERT INTO usuario(
nombre,correo,contrasena,rol
)
values
('Marcelo Diaz','marcelodiazchile@gmail.com','123marcelodiaz','usuario'),
('Sofia Cardenas','sofiacardenas1990@gmail.com','1990cardenassofia','usuario'),
('Martin Vergara','martinvergaracolocolo@gmail.com','colocololomasgrande123','usuario');

INSERT INTO visita(
fecha_visita,tipo_visita,id_usuario
)
values
('2025-03-24','Mantenimiento',1),
('2025-06-01','Aniversario del fallecido',1),
('2024-10-20','Duelo / Emocional',2),
('2024-10-21','Duelo / Emocional',2),
('2025-01-01','Otro',3);

INSERT INTO evento(
titulo,descripcion,fecha_evento,imagen
)
values
('Aniversario','Celebracion del aniversario del cementerio','2026-06-25',''),
('Visita de la comunidad','Visita de la comunidad','2026-05-30','');

INSERT INTO comentario(
contenido,fecha_comentario,id_usuario
)
values
('me encanto visitar el cementerio, la verdad que es muy agradable el ambiente, ya que tienen todo muy limpio ','2025-10-24',3),
('muy agradable la atencion del lugar aparte de la app muy intuitiva','2025-11-02',2);