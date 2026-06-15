const usuario = JSON.parse(localStorage.getItem('usuario'))

if(!usuario) {
    window.location.href = 'login.html'
}

if(usuario.rol !== 'usuario') {
    window.location.href = 'admin.html'
}

document.getElementById('bienvenida').textContent =
    `Bienvenido, ${usuario.nombre}`

function cerrarSesion() {
    localStorage.removeItem('usuario')
    window.location.href = 'login.html'
}

function mostrarSeccion(seccion) {

    if(seccion === 'fallecidos') {
        mostrarFallecidos()
    }

    else if(seccion === 'eventos') {
        mostrarEventos()
    }

    else if(seccion === 'comentarios') {
        mostrarFormularioComentario()
    }

    else if(seccion === 'visitas') {
        mostrarFormularioVisita()
    }
}
