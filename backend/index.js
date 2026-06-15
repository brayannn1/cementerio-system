const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())

// crud normal
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
const usuariosRegistroRouter = require('./consultas/usuariosRegistro')
const sepulturasAvanzadasRoutes = require('./consultas/sepulturas')
const comentariosAvanzadasRoutes = require('./consultas/comentarios')

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
app.use('/consultas/usuarios', usuariosRegistroRouter)
app.use('/consultas/sepulturas', sepulturasAvanzadasRoutes)
app.use('/consultas/comentarios', comentariosAvanzadasRoutes)

app.listen(3000, () => {
    console.log('Servidor corriendo')
})