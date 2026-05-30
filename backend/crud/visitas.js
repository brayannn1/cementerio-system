// post = crear
// get = obtener 
// put = actualizar 
// delete = eliminar

const express = require('express')
const router = express.Router()
const pool = require('../basededatos')

// post visitas
router.post('/', async (req, res) => {
    try {
        const {fecha_visita, tipo_visita, id_usuario} = req.body
        await pool.query(
            'INSERT INTO visita (fecha_visita,tipo_visita,id_usuario) VALUES ($1, $2, $3)',
            [fecha_visita,tipo_visita, id_usuario]
        )
        res.status(201).json({
            mensaje: 'Visita registrada con exito'
        }) } catch(error) {
            console.log(error)

            res.status(500).json({
                mensaje: 'Error al registrar visita'
            })
        }
    })

// get visitas
router.get('/', async (req, res) => {
    try {
    const resultado = await pool.query('SELECT * FROM visita')

    res.json(resultado.rows)
    } catch(error) {
        console.log(error)

        res.status(500).json({
            mensaje: 'Error'
        })
    }
})

// get visitas por id
router.get('/:id', async (req, res) => {
    try {
        const {id} = req.params
        const resultado = await pool.query(' SELECT * FROM visita WHERE id_visita = $1',
            [id]
        )
        res.json(resultado.rows)
    } catch(error) {
        console.log(error)

        res.status(500).json({
            mensaje: 'Error al buscar visita'
        })
    }
})

// put visitas
router.put('/:id', async (req, res) => {
    try {
        const {id} = req.params
        const {fecha_visita, tipo_visita, id_usuario} = req.body

        await pool.query(
            'UPDATE visita SET fecha_visita = $1, tipo_visita = $2, id_usuario = $3 WHERE id_visita = $4',
            [fecha_visita, tipo_visita, id_usuario, id]
        ) 
        res.status(200).json({
            mensaje: 'Visita actualizada con exito'
        }) 
    } catch(error) {
            console.log(error)

            res.status(500).json({
                mensaje: 'Error al actualiazar visita'
            })
        }
    })
// delete visitas
router.delete('/:id', async (req, res) => {
    try {
    const {id} = req.params
    await pool.query(
        'DELETE FROM visita WHERE id_visita = $1',
        [id]
    )
    res.status(200).json({
        mensaje: 'Visita eliminada con exito'
    }) } catch(error) {
        console.log(error)

        res.status(500).json({
            mensaje: 'Error al eliminar la visita'
        })
    }
}) 

module.exports = router