// post = crear
// get = obtener 
// put = actualizar 
// delete = eliminar

const express = require('express')
const router = express.Router()
const pool = require('../basededatos')

// post comentarios
router.post('/', async (req, res) => { 
    try {
        const {contenido, fecha_comentario, id_usuario} = req.body

        await pool.query(
            'INSERT INTO comentario(contenido, fecha_comentario, id_usuario) VALUES($1, $2, $3)',
            [contenido, fecha_comentario, id_usuario]
        )
        res.status(201).json({
            mensaje: 'Comentario creado con exito'
         }) 
        } catch(error) {
            console.log(error)

            res.status(500).json({
                mensaje: 'Error al crear comentario'
            })

        }
})

// get comentarios
router.get('/', async (req, res) => {
    try {
    const resultado = await pool.query('SELECT * FROM comentario')

    res.json(resultado.rows)
    } catch(error) {
        console.log(error)

        res.status(500).json({
            mensaje : 'Error'
        })
    }
});

// get comentarios por id
router.get('/:id', async (req, res) => {
    try {
        const {id} = req.params
        const resultado = await pool.query('SELECT * FROM comentario WHERE id_comentario =$1',
            [id]
        )
        res.json(resultado.rows)
    } catch(error) {
        console.log(error)

        res.status(500).json({
            mensaje: 'Error al buscar comentario'
        })
    }
})

// put comentarios
router.put('/:id', async (req, res) => {
    try {
        const {id} = req.params
        const {contenido, fecha_comentario, id_usuario} = req.body

        await pool.query(
            'UPDATE comentario SET contenido = $1, fecha_comentario = $2, id_usuario = $3 WHERE id_comentario = $4',
            [contenido, fecha_comentario, id_usuario, id]
        )
        res.status(200).json({
            mensaje: 'Comentario creado con exito'
        }) }catch(error) {
            console.log(error)
            
            res.status(500).json({
                mensaje: 'Error'
            })
        }
    })

// delete comentario
router.delete('/:id', async (req, res) => {
    try {
        const {id} = req.params
        await pool.query(
            'DELETE FROM comentario WHERE id_comentario = $1',
            [id]
        )
        res.status(200).json({
            mensaje: 'Comentario borrado con exito'
        }) } catch(error) {
            console.log(error)

            res.status(500).json({
                mensaje: 'Error'
            })
        }
    
})
module.exports = router
