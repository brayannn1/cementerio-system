// consultas con fallecidos

const express = require('express')
const router = express.Router()
const pool = require('../basededatos')


// get fallecidos mas recientes limite 10
// http://localhost:3000/buscar-fallecidos/fallecidos-recientes
router.get('/fallecidos-recientes', async (req, res) => {
    try {
        const resultado = await pool.query(
            `SELECT 
            f.nombre,
            f.fecha_fallecimiento,

            s.ubicacion_sepultura,

            sec.nombre

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
router.get('/fallecidos/:fecha1/:fecha2', async(req, res) => {
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
// http://localhost:3000/buscar-fallecidos/sector/total-fallecidos/norte
router.get('/sector/total-fallecidos/:nombre', async (req, res) => {
    try {
        const {nombre} = req.params
        const resultado = await pool.query(
            `SELECT 
            count(f.id_fallecido) as cantidad_total_fallecidos,
            sec.nombre
            
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
            
            sec.nombre
            
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

// get todos los fallecidos + fecha_nacimiento + fecha_fallecimiento + ubicacion_sepultura + ubicacion_sector
// http://localhost:3000/buscar-fallecidos
router.get('/', async (req, res) => {
    try {
        const resultado = await pool.query(
            `SELECT
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

// get fallecidos + fecha_nacimiento + fecha_fallecimiento + ubicacion_sepultura + ubicacion_sector 
// http://localhost:3000/buscar-fallecidos/juan
router.get('/:nombre', async (req, res) => {
    try {
        const {nombre} = req.params
        const resultados = await pool.query(
            `SELECT 
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
            mensaje: 'Error al encontrar usuario'
        })
    }
})

module.exports = router