SELECT u.nombre, c.contenido,c.fecha_comentario
FROM usuario as u
INNER JOIN comentario as c
ON u.id_usuario=c.id_usuario


SELECT s.id_sepultura, 
s.ubicacion_sepultura, 
s.estado,
sec.ubicacion_sector
FROM sepultura as s
INNER JOIN sector as sec
ON s.id_sector=sec.id_sector
WHERE s.estado = 'disponible'

SELECT tipo_visita, COUNT(*)
FROM visita
GROUP BY tipo_visita;

SELECT u.nombre, COUNT(v.id_visita) as cantidad_visitas
FROM usuario u
INNER JOIN visita v
on u.id_usuario=v.id_usuario
GROUP BY u.nombre;



SELECT f.nombre, f.fecha_fallecimiento, sec.ubicacion_sector
FROM fallecido as f
INNER JOIN sepultura as s
on f.id_sepultura= s.id_sepultura
INNER JOIN sector as sec
on sec.id_sector= s.id_sector
where sec.ubicacion_sector like 'Norte'
