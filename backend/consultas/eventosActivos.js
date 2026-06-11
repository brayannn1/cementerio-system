//consultas avanzadas con eventos
const express = require('express')
const router = express.Router()
const pool = require('../basededatos')

// get /consultas/eventos/proximo
router.get('/proximo', async (req, res) => {
    try {
        const resultado = await pool.query(`
            SELECT *
            FROM evento
            WHERE fecha_evento >= CURRENT_DATE
            ORDER BY fecha_evento ASC
            LIMIT 1
        `)

        res.json(resultado.rows)

    } catch(error) {
        console.log(error)

        res.status(500).json({
            mensaje: 'Error al buscar evento proximo'
        })
    }
})

// get /consultas/eventos/proximos
router.get('/proximos', async (req, res) => {
    try {
        const resultado = await pool.query(`
            SELECT *
            FROM evento
            WHERE fecha_evento >= CURRENT_DATE
            ORDER BY fecha_evento ASC
        `)

        res.json(resultado.rows)

    } catch(error) {
        console.log(error)

        res.status(500).json({
            mensaje: 'Error al buscar eventos proximos'
        })
    }
})

// get /consultas/eventos/mes-actual
router.get('/mes-actual', async (req, res) => {
    try {
        const resultado = await pool.query(`
            SELECT *
            FROM evento
            WHERE EXTRACT(MONTH FROM fecha_evento) = EXTRACT(MONTH FROM CURRENT_DATE)
            AND EXTRACT(YEAR FROM fecha_evento) = EXTRACT(YEAR FROM CURRENT_DATE)
            ORDER BY fecha_evento ASC
        `)

        res.json(resultado.rows)

    } catch(error) {
        console.log(error)

        res.status(500).json({
            mensaje: 'Error al buscar eventos del mes'
        })
    }
})

// get /consultas/eventos/fechas/2026-01-01/2026-12-31
router.get('/fechas/:fecha1/:fecha2', async (req, res) => {
    try {
        const { fecha1, fecha2 } = req.params

        const resultado = await pool.query(`
            SELECT *
            FROM evento
            WHERE fecha_evento BETWEEN $1 AND $2
            ORDER BY fecha_evento ASC
        `,
        [fecha1, fecha2])

        res.json(resultado.rows)

    } catch(error) {
        console.log(error)

        res.status(500).json({
            mensaje: 'Error al buscar eventos por fecha'
        })
    }
})

// get /consultas/eventos/buscar/mantenimiento
router.get('/buscar/:titulo', async (req, res) => {
    try {
        const { titulo } = req.params

        const resultado = await pool.query(`
            SELECT *
            FROM evento
            WHERE LOWER(titulo) LIKE LOWER($1)
        `,
        [`%${titulo}%`])

        res.json(resultado.rows)

    } catch(error) {
        console.log(error)

        res.status(500).json({
            mensaje: 'Error al buscar evento'
        })
    }
})

// get /consultas/eventos
router.get('/', async (req, res) => {
    try {
        const resultado = await pool.query(`
            SELECT *
            FROM evento
            ORDER BY fecha_evento ASC
        `)

        res.json(resultado.rows)

    } catch(error) {
        console.log(error)

        res.status(500).json({
            mensaje: 'Error al obtener eventos'
        })
    }
})

module.exports = router