const express = require('express')

//crud normal
const usuariosRoutes = require('./crud/usuarios')
const visitasRoutes = require('./crud/visitas')
const comentariosRoutes = require('./crud/comentarios')
const eventosRoutes = require('./crud/eventos')
const sectoresRoutes = require('./crud/sectores')
const sepulturasRoutes = require('./crud/sepulturas')
const fallecidosRoutes = require('./crud/fallecidos')

// consultas
const fallecidosUbicacionRoutes = require('./consultas/fallecidosUbicacion')
const app = express()

app.use(express.json())

app.use('/usuarios', usuariosRoutes)
app.use('/visitas', visitasRoutes)
app.use('/comentarios', comentariosRoutes)
app.use('/eventos', eventosRoutes)
app.use('/sectores', sectoresRoutes)
app.use('/sepulturas', sepulturasRoutes)
app.use('/fallecidos', fallecidosRoutes)
app.use('/buscar-fallecidos', fallecidosUbicacionRoutes)

app.listen(3000, () => {
    console.log('Servidor corriendo')
})