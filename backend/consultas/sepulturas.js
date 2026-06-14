//consultas avanzadas sepulturas
const express = require('express')
const router = express.Router()
const pool = require('../basededatos')

// buscar por ubicacion
router.get('/ubicacion/:ubicacion', async (req, res) => {
    try {
        const {ubicacion} = req.params
        
        const resultado = await pool.query(
            `SELECT *
            FROM sepultura
            WHERE LOWER(ubicacion_sepultura)
            LIKE LOWER($1)
            `,
            [`%${ubicacion}%`]
        )
        res.json(resultado.rows)
    }
    catch {
        console.log(error)

        res.status(500).json({
            mensaje: 'Error al buscar por ubicacion'
        })
    }
})
// buscar por estado
router.get('/estado/:estado', async (req, res) => {

    try {

        const { estado } = req.params

        const resultado = await pool.query(
            `
            SELECT *
            FROM sepultura
            WHERE LOWER(estado) = LOWER($1)
            `,
            [estado]
        )

        res.json(resultado.rows)

    } catch(error) {

        console.log(error)

        res.status(500).json({
            mensaje: 'Error al buscar por estado'
        })
    }
})
// buscar por sector
router.get('/sector/:sector', async (req, res) => {

    try {

        const { sector } = req.params

        const resultado = await pool.query(
            `
            SELECT
                s.id_sepultura,
                s.ubicacion_sepultura,
                s.estado,
                sec.nombre AS nombre_sector

            FROM sepultura s

            INNER JOIN sector sec
            ON sec.id_sector = s.id_sector

            WHERE LOWER(sec.nombre)
            LIKE LOWER($1)
            `,
            [`%${sector}%`]
        )

        res.json(resultado.rows)

    } catch(error) {

        console.log(error)

        res.status(500).json({
            mensaje: 'Error al buscar por sector'
        })
    }
})
// detalle de una sepultura
router.get('/detalle/:id', async (req, res) => {

    try {

        const { id } = req.params

        const resultado = await pool.query(
            `
            SELECT
                s.*,
                sec.nombre AS nombre_sector

            FROM sepultura s

            INNER JOIN sector sec
            ON sec.id_sector = s.id_sector

            WHERE s.id_sepultura = $1
            `,
            [id]
        )

        res.json(resultado.rows)

    } catch(error) {

        console.log(error)

        res.status(500).json({
            mensaje: 'Error al buscar detalle'
        })
    }
})
module.exports = router