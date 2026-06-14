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

module.exports = router