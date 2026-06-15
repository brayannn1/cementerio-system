async function mostrarComentarios() {

    const contenido =
        document.getElementById('contenidoAdmin')

    contenido.innerHTML = `
        <h2>Gestión de Comentarios</h2>

        <button onclick="mostrarFormularioComentario()">
            Nuevo Comentario
        </button>

        <br><br>

        <label>
            Buscar por:
        </label>

        <select
            id="tipoBusqueda"
            onchange="cambiarFiltroBusquedaComentario()"
        >
            <option value="id">
                ID Comentario
            </option>

            <option value="fecha">
                Fecha
            </option>

            <option value="id_usuario">
                ID Usuario
            </option>

            <option value="nombre_usuario">
                Nombre Usuario
            </option>

            <option value="rol">
                Rol Usuario
            </option>

        </select>

        <br><br>

        <div id="filtroBusqueda">

            <input
                type="number"
                id="valorBusqueda"
                placeholder="Ingrese ID de comentario"
            >

        </div>

        <button onclick="buscarComentarioAdmin()">
            Buscar
        </button>

        <hr>

        <div id="resultadoAdmin"></div>
    `
}

function cambiarFiltroBusquedaComentario() {

    const tipo =
        document.getElementById('tipoBusqueda').value

    const filtro =
        document.getElementById('filtroBusqueda')

    if(tipo === 'fecha') {

        filtro.innerHTML = `
            <label>Desde:</label>

            <input
                type="date"
                id="fecha1"
            >

            <label>Hasta:</label>

            <input
                type="date"
                id="fecha2"
            >
        `
    }

    else if(tipo === 'rol') {

        filtro.innerHTML = `
            <select id="valorBusqueda">

                <option value="usuario">
                    Usuario
                </option>

                <option value="admin">
                    Admin
                </option>

            </select>
        `
    }

    else if(tipo === 'id_usuario') {

        filtro.innerHTML = `
            <input
                type="number"
                id="valorBusqueda"
                placeholder="Ingrese ID del usuario"
            >
        `
    }

    else if(tipo === 'nombre_usuario') {

        filtro.innerHTML = `
            <input
                type="text"
                id="valorBusqueda"
                placeholder="Ingrese nombre del usuario"
            >
        `
    }

    else {

        filtro.innerHTML = `
            <input
                type="number"
                id="valorBusqueda"
                placeholder="Ingrese ID de comentario"
            >
        `
    }
}

async function buscarComentarioAdmin() {

    const tipo =
        document.getElementById('tipoBusqueda').value

    let url = ''

    if(tipo === 'id') {

        const valor =
            document.getElementById('valorBusqueda').value

        url =
        `http://localhost:3000/comentarios/${valor}`

    }

    else if(tipo === 'fecha') {

        const fecha1 =
            document.getElementById('fecha1').value

        const fecha2 =
            document.getElementById('fecha2').value

        if(!fecha1 || !fecha2) {
            alert('Seleccione ambas fechas')
            return
        }

        url =
        `http://localhost:3000/consultas/comentarios/fechas/${fecha1}/${fecha2}`

    }

    else if(tipo === 'id_usuario') {

        const valor =
            document.getElementById('valorBusqueda').value

        url =
        `http://localhost:3000/consultas/comentarios/usuario/${valor}`

    }

    else if(tipo === 'nombre_usuario') {

        const valor =
            document.getElementById('valorBusqueda').value

        url =
        `http://localhost:3000/consultas/comentarios/buscar/nombre/${encodeURIComponent(valor)}`

    }

    else if(tipo === 'rol') {

        const valor =
            document.getElementById('valorBusqueda').value

        url =
        `http://localhost:3000/consultas/comentarios/buscar/rol/${valor}`

    }

    const respuesta = await fetch(url)

    const datos = await respuesta.json()

    const lista = Array.isArray(datos) ? datos : [datos]

    mostrarResultadosComentario(lista)
}

function formatearFecha(fecha) {

    if(!fecha) return 'Sin fecha'

    return new Date(fecha).toLocaleDateString('es-CL', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    })
}

function mostrarResultadosComentario(datos) {

    const resultado =
        document.getElementById('resultadoAdmin')

    resultado.innerHTML = ''

    if(datos.length === 0){

        resultado.innerHTML =
            '<h3>No se encontraron resultados</h3>'

        return
    }

    datos.forEach(comentario => {

        resultado.innerHTML += `
            <div>

                <h3>
                    Comentario #${comentario.id_comentario}
                </h3>

                <p>
                    ${comentario.contenido.length > 80
                        ? comentario.contenido.substring(0, 80) + '...'
                        : comentario.contenido}
                </p>

                <p>
                    Fecha: ${formatearFecha(comentario.fecha_comentario)}
                </p>

                <p>
                    Usuario: ${comentario.nombre || 'ID ' + comentario.id_usuario}
                </p>

                <button
                    onclick="verDetalleComentario(${comentario.id_comentario})">
                    Ver
                </button>

                <button
                    onclick="editarComentario(${comentario.id_comentario})">
                    Editar
                </button>

                <button
                    onclick="eliminarComentario(${comentario.id_comentario})">
                    Eliminar
                </button>

                <hr>

            </div>
        `
    })
}

async function eliminarComentario(id) {

    const confirmar = confirm(
        '¿Está seguro que desea eliminar este comentario?'
    )

    if(!confirmar) return

    const respuesta = await fetch(
        `http://localhost:3000/comentarios/${id}`,
        {
            method: 'DELETE'
        }
    )

    const datos = await respuesta.json()

    alert(datos.mensaje)

    document.getElementById(
        'resultadoAdmin'
    ).innerHTML = ''
}

async function verDetalleComentario(id) {

    const detalleAnterior =
        document.getElementById('detalleAdmin')

    if(detalleAnterior){
        detalleAnterior.remove()
    }

    const respuesta = await fetch(
        `http://localhost:3000/consultas/comentarios/detalle/${id}`
    )

    const datos = await respuesta.json()

    const comentario = datos[0]

    document.getElementById('resultadoAdmin').innerHTML += `
        <div id="detalleAdmin">

            <h2>Comentario #${comentario.id_comentario}</h2>

            <p>
                Contenido: ${comentario.contenido}
            </p>

            <p>
                Fecha: ${formatearFecha(comentario.fecha_comentario)}
            </p>

            <p>
                Usuario: ${comentario.nombre}
            </p>

            <p>
                Correo: ${comentario.correo}
            </p>

            <p>
                Rol: ${comentario.rol}
            </p>

            <hr>

        </div>
    `
}

async function editarComentario(id) {

    const edicionAnterior =
        document.getElementById('editarAdmin')

    if(edicionAnterior){
        edicionAnterior.remove()
    }

    const respuesta = await fetch(
        `http://localhost:3000/comentarios/${id}`
    )

    const datos = await respuesta.json()

    const comentario = datos[0]

    document.getElementById('resultadoAdmin').innerHTML += `

        <div id="editarAdmin">

            <h2>Editar Comentario</h2>

            <textarea
                id="editarContenido"
                placeholder="Contenido"
            >${comentario.contenido}</textarea>

            <br><br>

            <button
                onclick="guardarEdicionComentario(${id}, '${comentario.fecha_comentario}', ${comentario.id_usuario})">
                Guardar cambios
            </button>

        </div>
    `
}

async function guardarEdicionComentario(id, fecha_comentario, id_usuario) {

    const contenido =
        document.getElementById('editarContenido').value

    if(!contenido) {
        alert('El contenido no puede estar vacío')
        return
    }

    const respuesta = await fetch(
        `http://localhost:3000/comentarios/${id}`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contenido,
                fecha_comentario,
                id_usuario
            })
        }
    )

    const datos = await respuesta.json()

    alert(datos.mensaje)
}

function mostrarFormularioComentario() {

    document.getElementById('contenidoAdmin').innerHTML = `

        <h2>Nuevo Comentario</h2>

        <textarea
            id="nuevoContenido"
            placeholder="Contenido del comentario"
        ></textarea>

        <br><br>

        <input
            type="number"
            id="nuevoIdUsuario"
            placeholder="ID del usuario"
        >

        <br><br>

        <button onclick="agregarComentario()">
            Guardar
        </button>

    `
}

async function agregarComentario() {

    const contenido =
        document.getElementById('nuevoContenido').value

    const id_usuario =
        document.getElementById('nuevoIdUsuario').value

    if(!contenido || !id_usuario) {
        alert('Complete todos los campos')
        return
    }

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
                id_usuario
            })
        }
    )

    const datos = await respuesta.json()

    alert(datos.mensaje)

    mostrarComentarios()
}