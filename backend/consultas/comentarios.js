// consultas avanzadas comentarios
const express = require('express')
const router = express.Router()
const pool = require('../basededatos')

// GET /consultas/comentarios/detalle/:id
router.get('/detalle/:id', async (req, res) => {
    try {
        const { id } = req.params

        const resultado = await pool.query(`
            SELECT
                c.id_comentario,
                c.contenido,
                c.fecha_comentario,

                u.id_usuario,
                u.nombre,
                u.correo,
                u.rol

            FROM comentario c

            INNER JOIN usuario u
            ON u.id_usuario = c.id_usuario

            WHERE c.id_comentario = $1
        `,
        [id])

        res.json(resultado.rows)

    } catch(error) {
        console.log(error)

        res.status(500).json({
            mensaje: 'Error al buscar detalle del comentario'
        })
    }
})

// GET /consultas/comentarios/fechas/:fecha1/:fecha2
router.get('/fechas/:fecha1/:fecha2', async (req, res) => {
    try {
        const { fecha1, fecha2 } = req.params

        const resultado = await pool.query(`
            SELECT
                c.id_comentario,
                c.contenido,
                c.fecha_comentario,

                u.id_usuario,
                u.nombre,
                u.rol

            FROM comentario c

            INNER JOIN usuario u
            ON u.id_usuario = c.id_usuario

            WHERE c.fecha_comentario BETWEEN $1 AND $2

            ORDER BY c.fecha_comentario DESC
        `,
        [fecha1, fecha2])

        res.json(resultado.rows)

    } catch(error) {
        console.log(error)

        res.status(500).json({
            mensaje: 'Error al buscar comentarios por fecha'
        })
    }
})

// GET /consultas/comentarios/usuario/:id
router.get('/usuario/:id', async (req, res) => {
    try {
        const { id } = req.params

        const resultado = await pool.query(`
            SELECT
                c.id_comentario,
                c.contenido,
                c.fecha_comentario,

                u.id_usuario,
                u.nombre,
                u.rol

            FROM comentario c

            INNER JOIN usuario u
            ON u.id_usuario = c.id_usuario

            WHERE u.id_usuario = $1

            ORDER BY c.fecha_comentario DESC
        `,
        [id])

        res.json(resultado.rows)

    } catch(error) {
        console.log(error)

        res.status(500).json({
            mensaje: 'Error al buscar comentarios del usuario'
        })
    }
})

// GET /consultas/comentarios/buscar/nombre/:nombre
router.get('/buscar/nombre/:nombre', async (req, res) => {
    try {
        const { nombre } = req.params

        const resultado = await pool.query(`
            SELECT
                c.id_comentario,
                c.contenido,
                c.fecha_comentario,

                u.id_usuario,
                u.nombre,
                u.rol

            FROM comentario c

            INNER JOIN usuario u
            ON u.id_usuario = c.id_usuario

            WHERE LOWER(u.nombre) LIKE LOWER($1)

            ORDER BY c.fecha_comentario DESC
        `,
        [`%${nombre}%`])

        res.json(resultado.rows)

    } catch(error) {
        console.log(error)

        res.status(500).json({
            mensaje: 'Error al buscar comentarios por nombre de usuario'
        })
    }
})

// GET /consultas/comentarios/buscar/rol/:rol
router.get('/buscar/rol/:rol', async (req, res) => {
    try {
        const { rol } = req.params

        const resultado = await pool.query(`
            SELECT
                c.id_comentario,
                c.contenido,
                c.fecha_comentario,

                u.id_usuario,
                u.nombre,
                u.rol

            FROM comentario c

            INNER JOIN usuario u
            ON u.id_usuario = c.id_usuario

            WHERE u.rol = $1

            ORDER BY c.fecha_comentario DESC
        `,
        [rol])

        res.json(resultado.rows)

    } catch(error) {
        console.log(error)

        res.status(500).json({
            mensaje: 'Error al buscar comentarios por rol'
        })
    }
})

module.exports = router