// post = crear
// get = obtener 
// put = actualizar 
// delete = eliminar

const express = require('express')
const router = express.Router()
const pool = require('../basededatos')

// post fallecidos
router.post('/', async (req, res) => {
    try {
        const {nombre, fecha_nacimiento, fecha_fallecimiento, biografia, id_sepultura} = req.body

        await pool.query(
            'INSERT INTO fallecido (nombre, fecha_nacimiento, fecha_fallecimiento, biografia, id_sepultura) VALUES($1,$2,$3,$4,$5)',
            [nombre, fecha_nacimiento, fecha_fallecimiento, biografia, id_sepultura]
        )
        res.status(201).json({
            mensaje: 'Fallecido registrado con exito'
        })
    } catch(error) {
        console.log(error) 

        res.status(500).json({
            mensaje: 'Error al registrar fallecido'
        })
    }
})
// get fallecidos
router.get('/', async (req, res) => {
    try {
        const resultado = await pool.query('SELECT * FROM fallecido')

        res.json(resultado.rows)
    } catch(error) {
        console.log(error)

        res.status(500).json({
            mensaje: 'Error'
        })
    }
}) 
// get fallecidos por id
router.get('/:id', async (req, res) => {
    try {
        const {id} = req.params
        const resultado = await pool.query('SELECT * FROM fallecido WHERE id_fallecido =$1',
            [id]
        )
        res.json(resultado.rows)
    } catch(error) {
        console.log(error)

        res.status(500).json({
            mensaje: 'Error al buscar fallecido'
        })
    }
})
// put fallecidos
router.put('/:id', async (req, res) => {
    try {
        const {id} = req.params
        const {nombre, fecha_nacimiento, fecha_fallecimiento, biografia, id_sepultura} = req.body

        await pool.query(
            'UPDATE fallecido SET nombre =$1, fecha_nacimiento =$2, fecha_fallecimiento = $3, biografia = $4, id_sepultura = $5 WHERE id_fallecido = $6',
            [nombre, fecha_nacimiento, fecha_fallecimiento, biografia, id_sepultura, id]  
        )

        res.status(200).json({
            mensaje: 'Fallecido actualizado con exito'
        })
    } catch(error) {
        console.log(error)

        res.status(500).json({
            mensaje: 'Error al actualizar fallecido'
        })
    }
})
// delete fallecidos
router.delete('/:id', async (req, res) => {
    try {
        const {id} = req.params

        await pool.query('DELETE FROM fallecido WHERE id_fallecido = $1',
            [id]
        )
        
        res.status(200).json({
            mensaje: 'Fallecido eliminado con exito'
        })
    } catch(error) {
        console.log(error)

        res.status(500).json({
            mensaje: 'Error al eliminar fallecido'
        })
    }
})
module.exports = router