//consultas avanzadas con visitas
const express = require('express')
const router = express.Router()
const pool = require('../basededatos')

// get /consultas/visitas/detalle/5
router.get('/detalle/:id', async (req, res) => {
    try {
        const { id } = req.params

        const resultado = await pool.query(`
            SELECT
                v.id_visita,
                v.fecha_visita,
                v.tipo_visita,

                u.id_usuario,
                u.nombre,
                u.correo,
                u.rol

            FROM visita v

            INNER JOIN usuario u
            ON u.id_usuario = v.id_usuario

            WHERE v.id_visita = $1
        `,
        [id])

        res.json(resultado.rows)

    } catch(error) {
        console.log(error)

        res.status(500).json({
            mensaje: 'Error al buscar detalle de visita'
        })
    }
})

// get /consultas/visitas/usuario-mas-activo
router.get('/usuario-mas-activo', async (req, res) => {
    try {
        const resultado = await pool.query(`
            SELECT
                u.id_usuario,
                u.nombre,
                COUNT(v.id_visita) as total_visitas

            FROM usuario u

            INNER JOIN visita v
            ON v.id_usuario = u.id_usuario

            GROUP BY
                u.id_usuario,
                u.nombre

            ORDER BY total_visitas DESC

            LIMIT 1
        `)

        res.json(resultado.rows)

    } catch(error) {
        console.log(error)

        res.status(500).json({
            mensaje: 'Error al buscar usuario mas activo'
        })
    }
})

// get /consultas/visitas/usuario/3
router.get('/usuario/:id', async (req, res) => {
    try {
        const { id } = req.params

        const resultado = await pool.query(`
            SELECT
                v.id_visita,
                v.fecha_visita,

                u.id_usuario,
                u.nombre

            FROM visita v

            INNER JOIN usuario u
            ON u.id_usuario = v.id_usuario

            WHERE u.id_usuario = $1
        `,
        [id])

        res.json(resultado.rows)

    } catch(error) {
        console.log(error)

        res.status(500).json({
            mensaje: 'Error al buscar visitas del usuario'
        })
    }
})

// get /consultas/visitas/tipos
router.get('/tipos', async (req, res) => {
    try {
        const resultado = await pool.query(`
            SELECT
                tipo_visita,
                COUNT(*) as cantidad

            FROM visita

            GROUP BY tipo_visita

            ORDER BY cantidad DESC
        `)

        res.json(resultado.rows)

    } catch(error) {
        console.log(error)

        res.status(500).json({
            mensaje: 'Error al contar tipos de visita'
        })
    }
})

// get /consultas/visitas/fechas/2026-01-01/2026-12-31
router.get('/fechas/:fecha1/:fecha2', async (req, res) => {
    try {
        const { fecha1, fecha2 } = req.params

        const resultado = await pool.query(`
            SELECT *
            FROM visita
            WHERE fecha_visita BETWEEN $1 AND $2
            ORDER BY fecha_visita DESC
        `,
        [fecha1, fecha2])

        res.json(resultado.rows)

    } catch(error) {
        console.log(error)

        res.status(500).json({
            mensaje: 'Error al buscar visitas'
        })
    }
})

// get /consultas/visitas/recientes
router.get('/recientes', async (req, res) => {
    try {
        const resultado = await pool.query(`
            SELECT *
            FROM visita
            ORDER BY fecha_visita DESC
            LIMIT 10
        `)

        res.json(resultado.rows)

    } catch(error) {
        console.log(error)

        res.status(500).json({
            mensaje: 'Error al buscar visitas recientes'
        })
    }
})

// get /consultas/visitas/total
router.get('/total', async (req, res) => {
    try {
        const resultado = await pool.query(`
            SELECT COUNT(*) as total_visitas
            FROM visita
        `)

        res.json(resultado.rows)

    } catch(error) {
        console.log(error)

        res.status(500).json({
            mensaje: 'Error al contar visitas'
        })
    }
})

// get /consultas/visitas
router.get('/', async (req, res) => {
    try {
        const resultado = await pool.query(`
            SELECT
                v.id_visita,
                v.fecha_visita,
                v.tipo_visita,

                u.id_usuario,
                u.nombre,
                u.correo

            FROM visita v

            INNER JOIN usuario u
            ON u.id_usuario = v.id_usuario

            ORDER BY v.fecha_visita DESC
        `)

        res.json(resultado.rows)

    } catch(error) {
        console.log(error)

        res.status(500).json({
            mensaje: 'Error al obtener visitas'
        })
    }
})







module.exports = router