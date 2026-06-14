const usuario =
    JSON.parse(localStorage.getItem('usuario'))

if(!usuario){
    window.location.href = 'login.html'
}

if(usuario.rol !== 'admin'){
    window.location.href = 'index.html'
}

function cerrarSesion(){

    localStorage.removeItem('usuario')

    window.location.href = 'login.html'
}