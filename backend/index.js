const express = require('express')

//crud normal
const usuariosRoutes = require('./crud/usuarios')
const visitasRoutes = require('./crud/visitas')
const comentariosRoutes = require('./crud/comentarios')
const eventosRoutes = require('./crud/eventos')
const sectoresRoutes = require('./crud/sectores')
const sepulturasRoutes = require('./crud/sepulturas')
const fallecidosRoutes = require('./crud/fallecidos')

// consultas avanzadas
const fallecidosUbicacionRoutes = require('./consultas/fallecidosUbicacion')
const sectoresDisponiblesRoutes = require('./consultas/sectoresDisponibles')
const eventosActivosRoutes = require('./consultas/eventosActivos')
const visitasUsuariosRoutes = require('./consultas/visitasUsuarios')

const app = express()

app.use(express.json())

// normal url
app.use('/usuarios', usuariosRoutes)
app.use('/visitas', visitasRoutes)
app.use('/comentarios', comentariosRoutes)
app.use('/eventos', eventosRoutes)
app.use('/sectores', sectoresRoutes)
app.use('/sepulturas', sepulturasRoutes)
app.use('/fallecidos', fallecidosRoutes)

// avanzado url
app.use('/consultas/fallecidos', fallecidosUbicacionRoutes)
app.use('/consultas/sectores', sectoresDisponiblesRoutes)
app.use('/consultas/eventos', eventosActivosRoutes)
app.use('/consultas/visitas', visitasUsuariosRoutes)

app.listen(3000, () => {
    console.log('Servidor corriendo')
})