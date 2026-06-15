// consultas avanzadas usuarios
const express = require('express')
const router = express.Router()
const pool = require('../basededatos')

router.post('/login', async (req, res) => {

    try {

        const { correo, contrasena } = req.body

        const resultado = await pool.query(
            `SELECT *
            FROM usuario
            WHERE correo = $1
            AND contrasena = $2`,
            [correo, contrasena]
        )

        if(resultado.rows.length === 0){
            return res.status(401).json({
                mensaje: 'Credenciales incorrectas'
            })
        }

        res.json({
            mensaje: 'Login correcto',
            usuario: resultado.rows[0]
        })

    } catch(error){

        console.log(error)

        res.status(500).json({
            mensaje: 'Error al iniciar sesión'
        })
    }
})

// GET /consultas/usuarios/buscar/nombre/:nombre
router.get('/buscar/nombre/:nombre', async (req, res) => {
    try {
    const { nombre } = req.params
    const resultado = await pool.query(
        `SELECT * FROM usuario WHERE LOWER(nombre) LIKE LOWER($1)`,
        [`%${nombre}%`]
    )
    res.json(resultado.rows)
} catch {
    console.log(error)

    res.status(500).json({
        mensaje: 'Error al buscar'
    }
    )
}
})

// GET /consultas/usuarios/buscar/correo/:correo
router.get('/buscar/correo/:correo', async (req, res) => {
    const { correo } = req.params
    const resultado = await pool.query(
        `SELECT * FROM usuario WHERE LOWER(correo) LIKE LOWER($1)`,
        [`%${correo}%`]
    )
    res.json(resultado.rows)
})

// GET /consultas/usuarios/buscar/rol/:rol
router.get('/buscar/rol/:rol', async (req, res) => {
    const { rol } = req.params
    const resultado = await pool.query(
        `SELECT * FROM usuario WHERE rol = $1`,
        [rol]
    )
    res.json(resultado.rows)
})

module.exports = router