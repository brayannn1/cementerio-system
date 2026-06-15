async function mostrarSectores() {

    const contenido =
        document.getElementById('contenidoAdmin')

    contenido.innerHTML = `
        <h2>Gestión de Sectores</h2>

        <button onclick="mostrarFormularioSector()">
            Nuevo Sector
        </button>

        <br><br>

        <label>
            Buscar por:
        </label>

        <select
            id="tipoBusqueda"
            onchange="cambiarFiltroBusquedaSector()"
        >
            <option value="nombre">
                Nombre
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

        <button onclick="buscarSectorAdmin()">
            Buscar
        </button>

        <hr>

        <div id="resultadoAdmin"></div>
    `
}

function cambiarFiltroBusquedaSector() {

    const tipo =
        document.getElementById('tipoBusqueda').value

    const filtro =
        document.getElementById('filtroBusqueda')

    filtro.innerHTML = `
        <input
            type="text"
            id="valorBusqueda"
            placeholder="Ingrese búsqueda"
        >
    `
}

async function buscarSectorAdmin() {

    const tipo =
        document.getElementById('tipoBusqueda').value

    const valor =
        document.getElementById('valorBusqueda').value

    let url = ''

    if(tipo === 'nombre') {

        url =
        `http://localhost:3000/consultas/sectores/detalle/${valor}`

    }

    else if(tipo === 'id') {

        url =
        `http://localhost:3000/sectores/${valor}`

    }

    const respuesta = await fetch(url)

    const datos = await respuesta.json()

    mostrarResultadosSector(datos)
}

function mostrarResultadosSector(datos) {

    const resultado =
        document.getElementById('resultadoAdmin')

    resultado.innerHTML = ''

    if(datos.length === 0){

        resultado.innerHTML =
            '<h3>No se encontraron resultados</h3>'

        return
    }

    datos.forEach(sector => {

        resultado.innerHTML += `
            <div>

                <h3>
                    ${sector.nombre}
                </h3>

                <p>
                    ID:
                    ${sector.id_sector}
                </p>

                <button
                    onclick="verDetalleSector(${sector.id_sector})">
                    Ver
                </button>

                <button
                    onclick="editarSector(${sector.id_sector})">
                    Editar
                </button>

                <button
                    onclick="eliminarSector(${sector.id_sector})">
                    Eliminar
                </button>

                <hr>

            </div>
        `
    })
}

async function eliminarSector(id) {

    const confirmar = confirm(
        '¿Está seguro que desea eliminar este sector?'
    )

    if(!confirmar){
        return
    }

    const respuesta = await fetch(
        `http://localhost:3000/sectores/${id}`,
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

async function verDetalleSector(id) {

    const detalleAnterior =
        document.getElementById('detalleAdmin')

    if(detalleAnterior){
        detalleAnterior.remove()
    }

    const respuesta = await fetch(
        `http://localhost:3000/sectores/${id}`
    )

    const datos = await respuesta.json()

    const sector = datos[0]

    document.getElementById('resultadoAdmin').innerHTML += `
        <div id="detalleAdmin">

            <h2>${sector.nombre}</h2>

            <p>
                ID:
                ${sector.id_sector}
            </p>

            <p>
                Ubicación:
                ${sector.ubicacion_sector}
            </p>

            <p>
                Cantidad de sepulturas:
                ${sector.cantidad_sepulturas}
            </p>

            <p>
                Metros cuadrados:
                ${sector.metros_cuadrados}
            </p>

            <hr>

        </div>
    `
}

async function editarSector(id) {

    const respuesta = await fetch(
        `http://localhost:3000/sectores/${id}`
    )

    const datos = await respuesta.json()

    const sector = datos[0]

    document.getElementById('resultadoAdmin').innerHTML += `

        <div id="editarAdmin">

            <h2>Editar Sector</h2>

            <input
                type="text"
                id="editarNombre"
                value="${sector.nombre}"
                placeholder="Nombre"
            >

            <br><br>

            <input
                type="text"
                id="editarUbicacion"
                value="${sector.ubicacion_sector}"
                placeholder="Ubicación"
            >

            <br><br>

            <input
                type="number"
                id="editarCantidad"
                value="${sector.cantidad_sepulturas}"
                placeholder="Cantidad de sepulturas"
            >

            <br><br>

            <input
                type="number"
                id="editarMetros"
                value="${sector.metros_cuadrados}"
                placeholder="Metros cuadrados"
            >

            <br><br>

            <button
                onclick="guardarEdicionSector(${id})">
                Guardar cambios
            </button>

        </div>
    `
}

async function guardarEdicionSector(id) {

    const nombre =
        document.getElementById('editarNombre').value

    const ubicacion_sector =
        document.getElementById('editarUbicacion').value

    const cantidad_sepulturas =
        document.getElementById('editarCantidad').value

    const metros_cuadrados =
        document.getElementById('editarMetros').value

    const respuesta = await fetch(
        `http://localhost:3000/sectores/${id}`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre,
                ubicacion_sector,
                cantidad_sepulturas,
                metros_cuadrados
            })
        }
    )

    const datos = await respuesta.json()

    alert(datos.mensaje)
}

function mostrarFormularioSector() {

    document.getElementById('contenidoAdmin').innerHTML = `

        <h2>Nuevo Sector</h2>

        <input
            type="text"
            id="nuevoNombre"
            placeholder="Nombre"
        >

        <br><br>

        <input
            type="text"
            id="nuevaUbicacion"
            placeholder="Ubicación"
        >

        <br><br>

        <input
            type="number"
            id="nuevaCantidad"
            placeholder="Cantidad de sepulturas"
        >

        <br><br>

        <input
            type="number"
            id="nuevosMetros"
            placeholder="Metros cuadrados"
        >

        <br><br>

        <button onclick="agregarSector()">
            Guardar
        </button>

    `
}

async function agregarSector() {

    const nombre =
        document.getElementById('nuevoNombre').value

    const ubicacion_sector =
        document.getElementById('nuevaUbicacion').value

    const cantidad_sepulturas =
        document.getElementById('nuevaCantidad').value

    const metros_cuadrados =
        document.getElementById('nuevosMetros').value

    if(!nombre || !ubicacion_sector || !cantidad_sepulturas || !metros_cuadrados){
        alert('Complete todos los campos')
        return
    }

    const respuesta = await fetch(
        'http://localhost:3000/sectores',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre,
                ubicacion_sector,
                cantidad_sepulturas,
                metros_cuadrados
            })
        }
    )

    const datos = await respuesta.json()

    alert(datos.mensaje)

    mostrarSectores()
}
