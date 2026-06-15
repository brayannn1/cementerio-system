async function registrar() {

    const nombre =
        document.getElementById('nombre').value

    const correo =
        document.getElementById('correo').value

    const contrasena =
        document.getElementById('contrasena').value

    if(!nombre || !correo || !contrasena) {
        alert('Complete todos los campos')
        return
    }

    const respuesta = await fetch(
        'http://localhost:3000/usuarios',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre,
                correo,
                contrasena,
                rol: 'usuario'
            })
        }
    )

    const datos = await respuesta.json()

    alert(datos.mensaje)

    if(respuesta.ok) {
        window.location.href = 'login.html'
    }
}
