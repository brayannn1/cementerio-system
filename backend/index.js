const express = require('express')

const usuariosRoutes = require('./crud/usuarios')
const visitasRoutes = require('./crud/visitas')
const comentariosRoutes = require('./crud/comentarios')

const app = express()

app.use(express.json())

app.use('/usuarios', usuariosRoutes)
app.use('/visitas', visitasRoutes)
app.use('/comentarios', comentariosRoutes)

app.listen(3000, () => {
    console.log('Servidor corriendo')
});