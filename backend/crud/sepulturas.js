// post = crear
// get = obtener 
// put = actualizar 
// delete = eliminar

const express = require('express')
const router = express.Router()
const pool = require('../basededatos')

// post sepulturas
router.post('/', async (req, res) => {
    try {
        const {ubicacion_sepultura, estado, id_sector} = req.body
        
        await pool.query(
            'INSERT INTO sepultura (ubicacion_sepultura, estado, id_sector) VALUES($1,$2,$3)',
            [ubicacion_sepultura, estado, id_sector]
        )
        res.status(201).json({
            mensaje: 'Sepultura creada con exito'
        })
    } catch(error) {
        console.log(error)

        res.status(500).json({
            mensaje: 'Error al crear sepultura'
        })
    }
})
// get sepulturas
router.get('/', async (req, res) => {
    try {
        const resultado = await pool.query('SELECT * FROM sepultura')
        
        res.json(resultado.rows)
    } catch(error) {
        console.log(error)

        res.status(500).json({
            mensaje: 'Error'
        })
    }
})

// get sepulturas por id
router.get('/:id', async (req, res) => {
    try {
        const {id} = req.params
        const resultado = await pool.query('SELECT * FROM sepultura WHERE id_sepultura=$1',
            [id]
        )
        
        res.json(resultado.rows)
        } catch(error) {
            console.log(error)

            res.status(500).json({
                mensaje: 'Error'
            })
        }
    })

// put sepulturas
router.put('/:id', async (req, res) => {
    try {
        const {id} = req.params
        
        const {ubicacion_sepultura, estado, id_sector} = req.body

        await pool.query('UPDATE sepultura SET ubicacion_sepultura = $1, estado = $2, id_sector = $3 WHERE id_sepultura = $4',
            [ubicacion_sepultura, estado, id_sector, id]
        )
        res.status(200).json({
            mensaje: 'Sepultura creada con exito'
        })
    } catch(error) {
        console.log(error)

        res.status(500).json({
            mensaje: 'Error al actualizar la sepultura'
        })
    }
})

// delete sepulturas
router.delete('/:id', async (req, res) => {
    try {
        const {id} = req.params
        await pool.query('DELETE FROM sepultura WHERE id_sepultura = $1',
            [id]
        )
        res.status(200).json({
            mensaje: 'Sepultura eliminada con exito'
        })
    } catch(error) {
        console.log(error)

        res.status(500).json({
            mensaje: 'Error al eliminar sepultura'
        })
    }
})
module.exports = router