async function mostrarEventos() {

    const contenido =
        document.getElementById('contenidoUsuario')

    contenido.innerHTML = `
        <h2>Eventos</h2>

        <div id="listaEventos">
            <p>Cargando eventos...</p>
        </div>
    `

    const respuesta = await fetch(
        'http://localhost:3000/eventos'
    )

    const datos = await respuesta.json()

    const lista =
        document.getElementById('listaEventos')

    lista.innerHTML = ''

    if(datos.length === 0) {

        lista.innerHTML =
            '<p>No hay eventos disponibles por el momento.</p>'

        return
    }

    datos.forEach(evento => {

        lista.innerHTML += `
            <div>

                <h3>${evento.titulo}</h3>

                <p>
                    Fecha:
                    ${new Date(evento.fecha_evento).toLocaleDateString('es-CL', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit'
                    })}
                </p>

                <p>${evento.descripcion}</p>

                <hr>

            </div>
        `
    })
}