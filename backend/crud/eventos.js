// post = crear
// get = obtener 
// put = actualizar 
// delete = eliminar

const express = require('express')
const router = express.Router()
const pool = require('../basededatos')

// post eventos
router.post('/', async (req, res) => {
    try {
        const {titulo, descripcion, fecha_evento, imagen} = req.body

        await pool.query(
            'INSERT INTO evento (titulo,descripcion,fecha_evento,imagen) VALUES ($1, $2, $3, $4)',
            [titulo, descripcion, fecha_evento, imagen]
        ) 
        res.status(201).json({
            mensaje: 'Evento creado con exito'
        }) } catch(error) {
            console.log(error)

            res.status(500).json({
                mensaje: 'Error al crear evento'
            })
        }
    })

// get eventos
router.get('/', async (req, res) => {
    try {
        const resultado = await pool.query('SELECT * FROM evento')

        res.json(resultado.rows)
    }catch(error) {
        console.log(error)

        res.status(500).json({
            mensaje: 'Error'
        })
    }
})

// get eventos por id
router.get('/:id', async (req, res) => {
    try {
        const {id} = req.params
        const resultado = await pool.query('SELECT * FROM evento WHERE id_evento = $1', 
            [id]
        )
        res.json(resultado.rows)
    } catch(error) {
        console.log(error)

        res.status(500).json({
            mensaje: 'Error al buscar evento'
        })
    }
})

// put eventos
router.put('/:id', async (req, res) => {
    try {
        const {id} = req.params
        const {titulo, descripcion, fecha_evento, imagen} = req.body

        await pool.query(
            'UPDATE evento SET titulo = $1, descripcion = $2, fecha_evento = $3, imagen = $4 WHERE id_evento = $5',
            [titulo, descripcion, fecha_evento, imagen, id]
        )
        res.status(200).json({
            mensaje: 'Evento actualizado con exito'
        }) } catch(error) {
            console.log(error)

            res.status(500).json({
                mensaje: 'Error al actualizar evento'
            })
        }  
})

// delete eventos
router.delete('/:id', async (req, res) => {
    try{
        const {id} = req.params
        await pool.query(
            'DELETE FROM evento WHERE id_evento = $1',
            [id]
        )
        res.status(200).json({
            mensaje: 'Evento eliminado con exito'
        }) } catch(error) {
            console.log(error)

            res.status(500).json({
                mensaje: 'Error al eliminar evento'
            })
        }
    })
    
module.exports = router