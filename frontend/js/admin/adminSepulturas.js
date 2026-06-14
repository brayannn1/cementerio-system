async function mostrarSepulturas() {

    const contenido =
        document.getElementById('contenidoAdmin')

    contenido.innerHTML = `
        <h2>Gestión de Sepulturas</h2>

        <button onclick="mostrarFormularioSepultura()">
            Nueva Sepultura
        </button>

        <br><br>

        <label>
            Buscar por:
        </label>

        <select
            id="tipoBusqueda"
            onchange="cambiarFiltroBusquedaSepultura()"
        >
            <option value="ubicacion">
                Ubicación
            </option>

            <option value="estado">
                Estado
            </option>

            <option value="sector">
                Sector
            </option>

            <option value="id">
                ID
            </option>
        </select>

        <br><br>

        <div id="filtroBusqueda">

            <input
                type="text"
                id="valorBusqueda"
                placeholder="Ingrese búsqueda"
            >

        </div>

        <button onclick="buscarSepulturaAdmin()">
            Buscar
        </button>

        <hr>

        <div id="resultadoAdmin"></div>
    `
}

function cambiarFiltroBusquedaSepultura() {

    const tipo =
        document.getElementById('tipoBusqueda').value

    const filtro =
        document.getElementById('filtroBusqueda')

    if(tipo === 'estado') {

        filtro.innerHTML = `
            <select id="valorBusqueda">

                <option value="Disponible">
                    Disponible
                </option>

                <option value="Ocupada">
                    Ocupada
                </option>

            </select>
        `
    }

    else if(tipo === 'sector') {

        filtro.innerHTML = `
            <select id="valorBusqueda">

                <option value="Norte">
                    Norte
                </option>

                <option value="Sur">
                    Sur
                </option>

                <option value="Este">
                    Este
                </option>

                <option value="Oeste">
                    Oeste
                </option>

            </select>
        `
    }

    else {

        filtro.innerHTML = `
            <input
                type="text"
                id="valorBusqueda"
                placeholder="Ingrese búsqueda"
            >
        `
    }
}

async function buscarSepulturaAdmin() {

    const tipo =
        document.getElementById('tipoBusqueda').value

    const valor =
        document.getElementById('valorBusqueda').value

    let url = ''

    if(tipo === 'ubicacion') {

        url =
        `http://localhost:3000/consultas/sepulturas/ubicacion/${valor}`

    }

    else if(tipo === 'estado') {

        url =
        `http://localhost:3000/consultas/sepulturas/estado/${valor}`

    }

    else if(tipo === 'sector') {

        url =
        `http://localhost:3000/consultas/sepulturas/sector/${valor}`

    }

    else if(tipo === 'id') {

        url =
        `http://localhost:3000/sepulturas/${valor}`

    }

    const respuesta = await fetch(url)

    const datos = await respuesta.json()

    mostrarResultadosSepultura(datos)
}

function mostrarResultadosSepultura(datos) {

    const resultado =
        document.getElementById('resultadoAdmin')

    resultado.innerHTML = ''

    if(datos.length === 0){

        resultado.innerHTML =
            '<h3>No se encontraron resultados</h3>'

        return
    }

    datos.forEach(sepultura => {

        resultado.innerHTML += `
            <div>

                <h3>
                    ${sepultura.ubicacion_sepultura}
                </h3>

                <p>
                    ID:
                    ${sepultura.id_sepultura}
                </p>

                <button
                    onclick="verDetalleSepultura(${sepultura.id_sepultura})">
                    Ver
                </button>

                <button
                    onclick="editarSepultura(${sepultura.id_sepultura})">
                    Editar
                </button>

                <button
                    onclick="eliminarSepultura(${sepultura.id_sepultura})">
                    Eliminar
                </button>

                <hr>

            </div>
        `
    })
}

async function eliminarSepultura(id) {

    const respuestaDetalle = await fetch(
        `http://localhost:3000/sepulturas/${id}`
    )

    const datosDetalle = await respuestaDetalle.json()

    const sepultura = datosDetalle[0]

    if(sepultura.estado === 'Ocupada') {

        alert(
            'No se puede eliminar una sepultura ocupada'
        )

        return
    }

    const confirmar = confirm(
        '¿Desea eliminar esta sepultura?'
    )

    if(!confirmar){
        return
    }

    const respuesta = await fetch(
        `http://localhost:3000/sepulturas/${id}`,
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

async function verDetalleSepultura(id) {
    const detalleAnterior =
    document.getElementById('detalleAdmin')

if(detalleAnterior){
    detalleAnterior.remove()
}

    const respuesta = await fetch(
        `http://localhost:3000/sepulturas/${id}`
    )

    const datos = await respuesta.json()

    const sepultura = datos[0]

    document.getElementById('resultadoAdmin').innerHTML += `
        <div id="detalleAdmin">

            <h2>
                ${sepultura.ubicacion_sepultura}
            </h2>

            <p>
                ID:
                ${sepultura.id_sepultura}
            </p>

            <p>
                Estado:
                ${sepultura.estado}
            </p>

            <p>
                ID Sector:
                ${sepultura.id_sector}
            </p>

            <hr>

        </div>
    `
}

async function editarSepultura(id) {

    const respuesta = await fetch(
        `http://localhost:3000/sepulturas/${id}`
    )

    const datos = await respuesta.json()

    const sepultura = datos[0]

    document.getElementById('resultadoAdmin').innerHTML += `

        <div id="editarAdmin">

            <h2>Editar Sepultura</h2>

            <input
                type="text"
                id="editarUbicacion"
                value="${sepultura.ubicacion_sepultura}"
            >

            <br><br>

            <select id="editarEstado">

                <option value="Disponible">
                    Disponible
                </option>

                <option value="Ocupada">
                    Ocupada
                </option>

            </select>

            <br><br>

            <select id="editarSector">

    <option value="1">
        Norte
    </option>

    <option value="2">
        Sur
    </option>

    <option value="3">
        Este
    </option>

    <option value="4">
        Oeste
    </option>

</select>
            <br><br>

            <button
                onclick="guardarEdicionSepultura(${id})">
                Guardar cambios
            </button>

        </div>
    `
    document.getElementById('editarEstado').value =
    sepultura.estado
    document.getElementById('editarSector').value =
    sepultura.id_sector
}

async function guardarEdicionSepultura(id) {

    const ubicacion_sepultura =
        document.getElementById('editarUbicacion').value

    const estado =
        document.getElementById('editarEstado').value

    const id_sector =
        document.getElementById('editarSector').value

    const respuesta = await fetch(
        `http://localhost:3000/sepulturas/${id}`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ubicacion_sepultura,
                estado,
                id_sector
            })
        }
    )

    const datos = await respuesta.json()

    alert(datos.mensaje)
}

function mostrarFormularioSepultura() {

    document.getElementById('contenidoAdmin').innerHTML = `

        <h2>Nueva Sepultura</h2>

        <input
            type="text"
            id="nuevaUbicacion"
            placeholder="Ubicación"
        >

        <br><br>

        <select id="nuevoEstado">

            <option value="Disponible">
                Disponible
            </option>

            <option value="Ocupada">
                Ocupada
            </option>

        </select>

        <br><br>

        <select id="nuevoSector">

            <option>
                Cargando sectores...
            </option>

        </select>

        <br><br>

        <button onclick="agregarSepultura()">
            Guardar
        </button>

    `

    cargarSectoresNuevo()
}

async function cargarSectoresNuevo() {

    const respuesta = await fetch(
        'http://localhost:3000/sectores'
    )

    const sectores = await respuesta.json()

    const select =
        document.getElementById('nuevoSector')

    select.innerHTML = ''

    sectores.forEach(sector => {

        select.innerHTML += `
            <option value="${sector.id_sector}">
                ${sector.nombre}
            </option>
        `
    })
}

async function agregarSepultura() {

    const ubicacion_sepultura =
        document.getElementById('nuevaUbicacion').value

    const estado =
        document.getElementById('nuevoEstado').value

    const id_sector =
        document.getElementById('nuevoSector').value

       if(!ubicacion_sepultura){
    alert('Ingrese una ubicación')
    return
} 
    const respuesta = await fetch(
        'http://localhost:3000/sepulturas',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ubicacion_sepultura,
                estado,
                id_sector
            })
        }
    )

    const datos = await respuesta.json()

    alert(datos.mensaje)

    mostrarSepulturas()
}