async function login() {

    const correo =
        document.getElementById('correo').value

    const contrasena =
        document.getElementById('contrasena').value

    const respuesta = await fetch(
        'http://localhost:3000/consultas/usuarios/login',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                correo,
                contrasena
            })
        }
    )

    const datos = await respuesta.json()

    if(!respuesta.ok){
        alert(datos.mensaje)
        return
    }

    localStorage.setItem(
        'usuario',
        JSON.stringify(datos.usuario)
    )

    if(datos.usuario.rol === 'admin'){
        window.location.href = 'admin.html'
    }
    else{
        window.location.href = 'index.html'
    }
}