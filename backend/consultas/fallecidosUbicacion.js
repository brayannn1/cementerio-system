// consultas avanzadas con fallecidos
const express = require('express')
const router = express.Router()
const pool = require('../basededatos')

// get fallecidos mas recientes limite 10
//http://localhost:3000/consultas/fallecidos/recientes
router.get('/recientes', async (req, res) => {
    try {
        const resultado = await pool.query(
            `SELECT 
            f.id_fallecido,
            f.nombre,
            f.fecha_fallecimiento,

            s.ubicacion_sepultura,

            sec.nombre as nombre_sector

            FROM fallecido as f

            INNER JOIN sepultura as s
            on s.id_sepultura=f.id_sepultura

            INNER JOIN sector as sec
            on sec.id_sector=s.id_sector

            ORDER BY f.fecha_fallecimiento Desc
            LIMIT 10`
        )
        
        res.json(resultado.rows)
    } catch(error) {
        console.log(error)

        res.status(500).json({
            mensaje: 'Error al buscar fallecidos mas recientes'
        })
    }
})

// get fallecidos por rango de fallecimientos 
//http://localhost:3000/consultas/fallecidos/fechas/2020-01-01/2024-01-01
router.get('/fechas/:fecha1/:fecha2', async(req, res) => {
    try {
        const {fecha1, fecha2} = req.params
        
        const resultado = await pool.query(
            `SELECT 
            f.nombre,
            f.fecha_nacimiento,
            f.fecha_fallecimiento,
            
            s.ubicacion_sepultura,
            
            sec.ubicacion_sector
            
            FROM fallecido as f
            
            INNER JOIN sepultura as s
            on s.id_sepultura=f.id_sepultura
            
            INNER JOIN sector as sec
            on sec.id_sector=s.id_sector
            
            WHERE f.fecha_fallecimiento
            BETWEEN $1 and $2 
            ORDER BY f.fecha_fallecimiento DESC`,
            [fecha1, fecha2]
        )

        res.json(resultado.rows)
    } catch(error) {
        console.log(error)

        res.status(500).json({
            mensaje: 'Error al buscar fallecidos por fecha de fallecimiento'
        })
    }
})

// get cantidad de fallecidos por sector 
//http://localhost:3000/consultas/fallecidos/total-fallecidos/norte
router.get('/total-fallecidos/:nombre', async (req, res) => {
    try {
        const {nombre} = req.params
        const resultado = await pool.query(
            `SELECT 
            count(f.id_fallecido) as cantidad_total_fallecidos,
            sec.nombre as nombre_sector
            
            FROM fallecido as f
            
            INNER JOIN sepultura as s
            on s.id_sepultura=f.id_sepultura
            
            INNER JOIN sector as sec
            on sec.id_sector=s.id_sector
            
            WHERE LOWER(sec.nombre) LIKE LOWER($1)
            GROUP BY sec.nombre`,
            [`%${nombre}%`]
        )

        res.json(resultado.rows)

    } catch(error) {
        console.log(error)

        res.status(500).json({
            mensaje: 'Error al encontrar cantidad total de fallecidos'
        })
    }
})

// get todos los fallecidos de un sector 
// http://localhost:3000/buscar-fallecidos/sector/norte
router.get('/sector/:nombre', async (req, res) => {
    try {
        const {nombre} = req.params
        const resultado = await pool.query(
            `SELECT 
            f.nombre,
            f.fecha_nacimiento,
            f.fecha_fallecimiento,

            s.ubicacion_sepultura,
            
            sec.nombre as nombre_sector
            
            FROM fallecido as f
            
            INNER JOIN sepultura as s
            ON s.id_sepultura=f.id_sepultura
            
            INNER JOIN sector as sec
            ON sec.id_sector=s.id_sector
            
            WHERE LOWER(sec.nombre) LIKE LOWER($1)`,
            [`%${nombre}%`]
        )

        res.json(resultado.rows)
    } catch(error) {
        console.log(error)

        res.status(500).json({
            mensaje: 'Error al encontrar fallecidos'
        })
    }
})
//http://localhost:3000/consultas/fallecidos/detalle/5
router.get('/detalle/:id', async (req, res) => {
    try {
        const { id } = req.params

        const resultado = await pool.query(
            `SELECT
            f.nombre,
            f.fecha_nacimiento,
            f.fecha_fallecimiento,
            f.biografia,

            s.ubicacion_sepultura,
            s.estado,

            sec.nombre,
            sec.ubicacion_sector,

            f.id_fallecido,
            s.id_sepultura,
            sec.id_sector

            FROM fallecido f

            INNER JOIN sepultura s
            ON s.id_sepultura = f.id_sepultura

            INNER JOIN sector sec
            ON sec.id_sector = s.id_sector

            WHERE f.id_fallecido = $1`,
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
// get fallecidos + fecha_nacimiento + fecha_fallecimiento + ubicacion_sepultura + ubicacion_sector 
//http://localhost:3000/consultas/fallecidos/buscar/juan
router.get('/buscar/:nombre', async (req, res) => {
    try {
        const {nombre} = req.params
        const resultados = await pool.query(
            `SELECT 
            f.id_fallecido,
            f.nombre,
            f.fecha_nacimiento, 
            f.fecha_fallecimiento,

            s.ubicacion_sepultura,

            sec.ubicacion_sector

            FROM fallecido as f
            INNER JOIN sepultura as s
            ON s.id_sepultura=f.id_sepultura
            INNER JOIN sector as sec
            ON sec.id_sector=s.id_sector
            WHERE LOWER(f.nombre) LIKE LOWER($1)`,
            [`%${nombre}%`]
        )

        res.json(resultados.rows)
        }
    catch(error) {
        console.log(error)

        res.status(500).json({
            mensaje: 'Error al encontrar fallecido'
        })
    }
})
// get todos los fallecidos + fecha_nacimiento + fecha_fallecimiento + ubicacion_sepultura + ubicacion_sector
//http://localhost:3000/consultas/fallecidos
router.get('/', async (req, res) => {
    try {
        const resultado = await pool.query(
            `SELECT
            f.id_fallecido,
            f.nombre,
            f.fecha_nacimiento,
            f.fecha_fallecimiento,
            
            s.ubicacion_sepultura,
            
            sec.ubicacion_sector
            
            FROM fallecido as f
            
            INNER JOIN sepultura as s
            ON s.id_sepultura=f.id_sepultura
            
            INNER JOIN sector as sec
            ON sec.id_sector=s.id_sector`
        )

        res.json(resultado.rows)
    } catch(error) {
        console.log(error)

        res.status(500).json({
            mensaje: 'Error al encontrar usuarios'
        })
    }
})

module.exports = router