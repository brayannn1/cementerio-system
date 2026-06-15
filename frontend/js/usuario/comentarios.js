function mostrarFormularioComentario() {

    const contenido =
        document.getElementById('contenidoUsuario')

    contenido.innerHTML = `
        <h2>Dejar un comentario</h2>

        <textarea
            id="contenidoComentario"
            placeholder="Escribe tu comentario aquí..."
            rows="5"
        ></textarea>

        <br><br>

        <button onclick="enviarComentario()">
            Enviar comentario
        </button>
    `
}

async function enviarComentario() {

    const contenido =
        document.getElementById('contenidoComentario').value

    if(!contenido) {
        alert('Escribe algo antes de enviar')
        return
    }

    const usuario =
        JSON.parse(localStorage.getItem('usuario'))

    const fecha_comentario =
        new Date().toISOString()

    const respuesta = await fetch(
        'http://localhost:3000/comentarios',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contenido,
                fecha_comentario,
                id_usuario: usuario.id_usuario
            })
        }
    )

    const datos = await respuesta.json()

    alert(datos.mensaje)

    document.getElementById('contenidoComentario').value = ''
}
