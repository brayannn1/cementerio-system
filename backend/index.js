const express = require('express')

const usuariosRoutes = require('./crud/usuarios')
const visitasRoutes = require('./crud/visitas')
const comentariosRoutes = require('./crud/comentarios')
const eventosRoutes = require('./crud/eventos')
const sectorRoutes = require('./crud/sector')
const sepulturasRoutes = require('./crud/sepulturas')
const fallecidosRoutes = require('./crud/fallecidos')

const app = express()

app.use(express.json())

app.use('/usuarios', usuariosRoutes)
app.use('/visitas', visitasRoutes)
app.use('/comentarios', comentariosRoutes)
app.use('/eventos', eventosRoutes)
app.use('/sector', sectorRoutes)
app.use('/sepulturas', sepulturasRoutes)
app.use('/fallecidos', fallecidosRoutes)

app.listen(3000, () => {
    console.log('Servidor corriendo')
})