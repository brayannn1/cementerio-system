// post = crear
// get = obtener
// put = actualizar 
// delete = eliminar


const express = require('express')
const router = express.Router()
const pool = require('../basededatos')

// post usuarios
router.post('/', async (req, res) => {
    try {
    const { nombre, correo, contrasena, rol} = req.body

    await pool.query(
        'INSERT INTO usuario(nombre, correo, contrasena, rol) VALUES($1, $2, $3, $4)',
        [nombre, correo, contrasena, rol]
    )
    
    res.status(201).json({
        mensaje: 'Usuario creado con exito'
    })
    } catch(error) {
        console.log(error)

        res.status(500).json({
            mensaje: 'Error al crear usuario'
        })
    }

})

// get usuarios
router.get('/', async (req, res) => {
    try {
    const resultado = await pool.query('SELECT * FROM usuario')

    res.json(resultado.rows)
    } catch(error) {
        console.log(error)

        res.status(500).json({
            mensaje: 'Error'
        })
    }
})
// get usuarios por id
router.get('/:id', async (req, res) => {
    try {
        const {id} = req.params
        const resultado = await pool.query('SELECT * FROM usuario WHERE id_usuario = $1',
            [id]
        )
        
        res.json(resultado.rows)
        } 
        catch(error) {
        console.log(error)

        res.status(500).json({
            mensaje: 'Error al buscar usuario'
        })
    }
})

// put usuarios
router.put('/:id', async (req, res) => {
    try {
    const {id} = req.params
    
    const {nombre, correo, contrasena, rol} = req.body
    await pool.query(
        ' UPDATE usuario SET nombre = $1, correo = $2, contrasena = $3, rol =$4 WHERE id_usuario =$5',
        [nombre, correo, contrasena, rol, id]           
    )
    res.status(200).json({
        mensaje: 'Usuario actualizado con exito'
    })
} catch(error) {
    console.log(error)
    
    res.status(500).json({
        mensaje: 'Error al actualizar usuario'
    })
}
})

// delete usuarios
router.delete('/:id', async (req, res) => {
    try {
    const {id} = req.params

    await pool.query(
        'DELETE FROM usuario WHERE id_usuario = $1',
        [id]
    )
    res.status(200).json({
        mensaje: 'Usuario eliminado con exito'
    })
} catch(error){
    console.log(error)

    res.status(500).json({
        mensaje: 'Error al eliminar usuario'
    })
}
})


module.exports = router