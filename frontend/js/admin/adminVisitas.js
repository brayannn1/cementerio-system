const TIPOS_VISITA = [
    'Mantenimiento',
    'Aniversario del fallecido',
    'Duelo / Emocional',
    'Otro'
]

async function mostrarVisitas() {

    const contenido =
        document.getElementById('contenidoAdmin')

    contenido.innerHTML = `
        <h2>Gestión de Visitas</h2>

        <button onclick="mostrarFormularioVisita()">
            Nueva Visita
        </button>

        <br><br>

        <label>
            Buscar por:
        </label>

        <select
            id="tipoBusqueda"
            onchange="cambiarFiltroBusquedaVisita()"
        >
            <option value="id">
                ID Visita
            </option>

            <option value="nombre">
            Nombre
            </option>

            <option value="fecha">
                Fecha
            </option>

            <option value="id_usuario">
                ID Usuario
            </option>

            <option value="tipo">
                Tipo de visita
            </option>

        </select>

        <br><br>

        <div id="filtroBusqueda">

            <input
                type="number"
                id="valorBusqueda"
                placeholder="Ingrese ID de visita"
            >

        </div>

        <button onclick="buscarVisitaAdmin()">
            Buscar
        </button>

        <hr>

        <div id="resultadoAdmin"></div>
    `
}

function cambiarFiltroBusquedaVisita() {

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

    else if(tipo === 'tipo') {

        const opciones = TIPOS_VISITA.map(t =>
            `<option value="${t}">${t}</option>`
        ).join('')

        filtro.innerHTML = `
            <select id="valorBusqueda">
                ${opciones}
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
    else if(tipo === 'nombre') {

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
                placeholder="Ingrese ID de visita"
            >
        `
    }
}

async function buscarVisitaAdmin() {

    const tipo =
        document.getElementById('tipoBusqueda').value

    let url = ''

    if(tipo === 'id') {

        const valor =
            document.getElementById('valorBusqueda').value

        url =
        `http://localhost:3000/consultas/visitas/detalle/${valor}`

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
        `http://localhost:3000/consultas/visitas/fechas/${fecha1}/${fecha2}`

    }
    else if(tipo=== 'nombre') {
        const valor =
            document.getElementById('valorBusqueda').value

            url =
            `http://localhost:3000/consultas/visitas/usuario-nombre/${valor}`
    }

    else if(tipo === 'id_usuario') {

        const valor =
            document.getElementById('valorBusqueda').value

        url =
        `http://localhost:3000/consultas/visitas/usuario/${valor}`

    }

    else if(tipo === 'tipo') {

        const valor =
            document.getElementById('valorBusqueda').value

        url =
        `http://localhost:3000/consultas/visitas/tipo/${encodeURIComponent(valor)}`

    }

    const respuesta = await fetch(url)

    const datos = await respuesta.json()

    const lista = Array.isArray(datos) ? datos : [datos]

    mostrarResultadosVisita(lista)
}

function formatearFecha(fecha) {

    if(!fecha) return 'Sin fecha'

    return new Date(fecha).toLocaleDateString('es-CL', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    })
}

function mostrarResultadosVisita(datos) {

    const resultado =
        document.getElementById('resultadoAdmin')

    resultado.innerHTML = ''

    if(datos.length === 0){

        resultado.innerHTML =
            '<h3>No se encontraron resultados</h3>'

        return
    }

    datos.forEach(visita => {

        resultado.innerHTML += `
            <div>

                <h3>
                    Visita #${visita.id_visita}
                </h3>

                <p>
                    Fecha: ${formatearFecha(visita.fecha_visita)}
                </p>

                <p>
                    Tipo: ${visita.tipo_visita}
                </p>

                <p>
                    Usuario: ${visita.nombre || 'ID ' + visita.id_usuario}
                </p>

                <button
                    onclick="verDetalleVisita(${visita.id_visita})">
                    Ver
                </button>

                <button
                    onclick="editarVisita(${visita.id_visita})">
                    Editar
                </button>

                <button
                    onclick="eliminarVisita(${visita.id_visita})">
                    Eliminar
                </button>

                <hr>

            </div>
        `
    })
}

async function eliminarVisita(id) {

    const confirmar = confirm(
        '¿Está seguro que desea eliminar esta visita?'
    )

    if(!confirmar) return

    const respuesta = await fetch(
        `http://localhost:3000/visitas/${id}`,
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

async function verDetalleVisita(id) {

    const detalleAnterior =
        document.getElementById('detalleAdmin')

    if(detalleAnterior){
        detalleAnterior.remove()
    }

    const respuesta = await fetch(
        `http://localhost:3000/consultas/visitas/detalle/${id}`
    )

    const datos = await respuesta.json()

    const visita = datos[0]

    document.getElementById('resultadoAdmin').innerHTML += `
        <div id="detalleAdmin">

            <h2>Visita #${visita.id_visita}</h2>

            <p>
                Fecha: ${formatearFecha(visita.fecha_visita)}
            </p>

            <p>
                Tipo: ${visita.tipo_visita}
            </p>

            <p>
                Usuario: ${visita.nombre}
            </p>

            <p>
                Correo: ${visita.correo}
            </p>

            <p>
                Rol: ${visita.rol}
            </p>

            <hr>

        </div>
    `
}

async function editarVisita(id) {

    const edicionAnterior =
        document.getElementById('editarAdmin')

    if(edicionAnterior){
        edicionAnterior.remove()
    }

    const respuesta = await fetch(
        `http://localhost:3000/visitas/${id}`
    )

    const datos = await respuesta.json()

    const visita = datos[0]

    const opciones = TIPOS_VISITA.map(t =>
        `<option value="${t}">${t}</option>`
    ).join('')

    document.getElementById('resultadoAdmin').innerHTML += `

        <div id="editarAdmin">

            <h2>Editar Visita</h2>

            <input
                type="date"
                id="editarFecha"
                value="${visita.fecha_visita ? visita.fecha_visita.split('T')[0] : ''}"
            >

            <br><br>

            <select id="editarTipo">
                ${opciones}
            </select>

            <br><br>

            <input
                type="number"
                id="editarIdUsuario"
                value="${visita.id_usuario}"
                placeholder="ID Usuario"
            >

            <br><br>

            <button
                onclick="guardarEdicionVisita(${id})">
                Guardar cambios
            </button>

        </div>
    `

    document.getElementById('editarTipo').value =
        visita.tipo_visita
}

async function guardarEdicionVisita(id) {

    const fecha_visita =
        document.getElementById('editarFecha').value

    const tipo_visita =
        document.getElementById('editarTipo').value

    const id_usuario =
        document.getElementById('editarIdUsuario').value

    if(!fecha_visita || !id_usuario) {
        alert('Complete todos los campos')
        return
    }

    const respuesta = await fetch(
        `http://localhost:3000/visitas/${id}`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                fecha_visita,
                tipo_visita,
                id_usuario
            })
        }
    )

    const datos = await respuesta.json()

    alert(datos.mensaje)
}

function mostrarFormularioVisita() {

    const opciones = TIPOS_VISITA.map(t =>
        `<option value="${t}">${t}</option>`
    ).join('')

    document.getElementById('contenidoAdmin').innerHTML = `

        <h2>Nueva Visita</h2>

        <input
            type="date"
            id="nuevaFecha"
        >

        <br><br>

        <select id="nuevoTipo">
            ${opciones}
        </select>

        <br><br>

        <input
            type="number"
            id="nuevoIdUsuario"
            placeholder="ID del usuario"
        >

        <br><br>

        <button onclick="agregarVisita()">
            Guardar
        </button>

    `
}

async function agregarVisita() {

    const fecha_visita =
        document.getElementById('nuevaFecha').value

    const tipo_visita =
        document.getElementById('nuevoTipo').value

    const id_usuario =
        document.getElementById('nuevoIdUsuario').value

    if(!fecha_visita || !id_usuario) {
        alert('Complete todos los campos')
        return
    }

    const respuesta = await fetch(
        'http://localhost:3000/visitas',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                fecha_visita,
                tipo_visita,
                id_usuario
            })
        }
    )

    const datos = await respuesta.json()

    alert(datos.mensaje)

    mostrarVisitas()
}