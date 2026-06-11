//consultas avanzadas con sectores
const express = require('express')
const router = express.Router()
const pool = require('../basededatos')

// get /consultas/sectores/disponibles
router.get('/disponibles', async (req, res) => {
    try {
        const resultado = await pool.query(`
            SELECT
                sec.nombre AS nombre_sector,
                COUNT(s.id_sepultura) AS sepulturas_disponibles
            FROM sector sec

            INNER JOIN sepultura s
            ON s.id_sector = sec.id_sector

            WHERE LOWER(s.estado) = 'disponible'

            GROUP BY sec.nombre
            ORDER BY sec.nombre
        `)

        res.json(resultado.rows)

    } catch(error) {
        console.log(error)

        res.status(500).json({
            mensaje: 'Error al buscar disponibilidad'
        })
    }
})

// get /consultas/sectores/ocupadas
router.get('/ocupadas', async (req, res) => {
    try {
        const resultado = await pool.query(`
            SELECT
                sec.nombre AS nombre_sector,
                COUNT(s.id_sepultura) AS sepulturas_ocupadas
            FROM sector sec

            INNER JOIN sepultura s
            ON s.id_sector = sec.id_sector

            WHERE LOWER(s.estado) = 'ocupada'

            GROUP BY sec.nombre
            ORDER BY sec.nombre
        `)

        res.json(resultado.rows)

    } catch(error) {
        console.log(error)

        res.status(500).json({
            mensaje: 'Error al buscar ocupadas'
        })
    }
})

// get /consultas/sectores/disponibles/norte
router.get('/disponibles/:nombre', async (req, res) => {
    try {
        const { nombre } = req.params

        const resultado = await pool.query(`
            SELECT
                sec.nombre AS nombre_sector,
                COUNT(s.id_sepultura) AS sepulturas_disponibles

            FROM sector sec

            INNER JOIN sepultura s
            ON s.id_sector = sec.id_sector

            WHERE LOWER(sec.nombre) LIKE LOWER($1)
            AND LOWER(s.estado) = 'disponible'

            GROUP BY sec.nombre
        `,
        [`%${nombre}%`])

        res.json(resultado.rows)

    } catch(error) {
        console.log(error)

        res.status(500).json({
            mensaje: 'Error al buscar sector'
        })
    }
})

// get /consultas/sectores/sepulturas-libres
router.get('/sepulturas-libres', async (req, res) => {
    try {
        const resultado = await pool.query(`
            SELECT
                s.id_sepultura,
                s.ubicacion_sepultura,
                sec.nombre AS nombre_sector

            FROM sepultura s

            INNER JOIN sector sec
            ON sec.id_sector = s.id_sector

            WHERE LOWER(s.estado) = 'disponible'

            ORDER BY sec.nombre
        `)

        res.json(resultado.rows)

    } catch(error) {
        console.log(error)

        res.status(500).json({
            mensaje: 'Error al buscar sepulturas libres'
        })
    }
})

// get /consultas/sectores/sector-mas-ocupado
router.get('/sector-mas-ocupado', async (req, res) => {
    try {
        const resultado = await pool.query(`
            SELECT
                sec.nombre AS nombre_sector,
                COUNT(s.id_sepultura) AS cantidad_ocupadas

            FROM sector sec

            INNER JOIN sepultura s
            ON s.id_sector = sec.id_sector

            WHERE LOWER(s.estado) = 'ocupada'

            GROUP BY sec.nombre

            ORDER BY cantidad_ocupadas DESC

            LIMIT 1
        `)

        res.json(resultado.rows)

    } catch(error) {
        console.log(error)

        res.status(500).json({
            mensaje: 'Error al buscar sector mas ocupado'
        })
    }
})

// get /consultas/sectores/detalle/norte
router.get('/detalle/:nombre', async (req, res) => {
    try {
        const { nombre } = req.params

        const resultado = await pool.query(`
            SELECT
                sec.id_sector,
                sec.nombre,
                sec.ubicacion_sector,

                COUNT(s.id_sepultura) as total_sepulturas

            FROM sector sec

            LEFT JOIN sepultura s
            ON s.id_sector = sec.id_sector

            WHERE LOWER(sec.nombre) LIKE LOWER($1)

            GROUP BY
                sec.id_sector,
                sec.nombre,
                sec.ubicacion_sector
        `,
        [`%${nombre}%`])

        res.json(resultado.rows)

    } catch(error) {
        console.log(error)

        res.status(500).json({
            mensaje: 'Error al buscar detalle del sector'
        })
    }
})

module.exports = router