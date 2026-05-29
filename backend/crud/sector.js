// post = crear
// get = obtener usuarios
// put = actualizar 
// delete = eliminar

const express = require('express')
const router = express.Router()
const pool = require('../basededatos')

// post sector
router.post('/', async (req, res) => {
    try {
    const {nombre, ubicacion_sector, cantidad_sepulturas, metros_cuadrados} = req.body

    await pool.query(
        'INSERT INTO sector(nombre, ubicacion_sector, cantidad_sepulturas, metros_cuadrados) VALUES ($1, $2, $3, $4)',
        [nombre, ubicacion_sector, cantidad_sepulturas, metros_cuadrados] 
    )
    res.status(201).json({
        mensaje: 'Sector creado con exito'
    }) } catch(error) {
        console.log(error)

        res.status(500).json({
            mensaje: 'Error al crear sector'
        })
    }
})
// get sector
router.get('/', async (req, res) => {
    try {
        const resultado = await pool.query('SELECT * FROM sector')

        res.json(resultado.rows)
    } catch(error) {
        console.log(error)

        res.status(500).json({
            mensaje: 'Error'
        })
    }
})
// put sector
router.put('/:id', async (req, res) => {
    try {
        const {id} = req.params
        const {nombre, ubicacion_sector, cantidad_sepulturas, metros_cuadrados} = req.body

        await pool.query(
            'UPDATE sector SET nombre = $1, ubicacion_sector = $2, cantidad_sepulturas = $3, metros_cuadrados = $4 WHERE id_sector = $5',
            [nombre, ubicacion_sector, cantidad_sepulturas, metros_cuadrados, id]
        )
        res.status(200).json({
            mensaje: 'Sector actualizado con exito'
        }) } catch(error) {
            console.log(error)

            res.status(500).json({
                mensaje: 'Error al actualizar sector'
            })
        }
})

// delete sector
router.delete('/:id', async (req, res) => {
    try {
    const {id} = req.params

    await pool.query(
        'DELETE FROM sector WHERE id_sector = $1',
        [id]
    )
    res.status(200).json({
        mensaje: 'Sector eliminado con exito'
    }) } catch(error) {
        console.log(error)

        res.status(500).json({
            mensaje: 'Error al eliminar sector'
        })
    }
})

module.exports = router