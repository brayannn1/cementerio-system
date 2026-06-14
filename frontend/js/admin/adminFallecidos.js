async function mostrarFallecidos() {

    const contenido =
        document.getElementById('contenidoAdmin')

    contenido.innerHTML = `
        <h2>Gestión de Fallecidos</h2>

  <button onclick="mostrarFormularioFallecido()">
    Nuevo Fallecido
</button>

<br><br>
        <label>
            Buscar por:
        </label>
        
        <select
    id="tipoBusqueda"
    onchange="cambiarFiltroBusquedaFallecidos()"
>
    <option value="nombre">Nombre</option>

    <option value="id">ID</option>

    <option value="sector">Sector</option>

    <option value="fecha">Fecha</option>
</select>

        <br><br>

        <div id="filtroBusqueda">

    <input
        type="text"
        id="valorBusqueda"
        placeholder="Ingrese búsqueda"
    >

</div>

        <button onclick="buscarFallecidoAdmin()">
            Buscar
        </button>

        <hr>

        <div id="resultadoAdmin"></div>
    `
}

function cambiarFiltroBusquedaFallecidos() {

    const tipo =
        document.getElementById('tipoBusqueda').value

    const filtro =
        document.getElementById('filtroBusqueda')

    if(tipo === 'sector') {

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

    else if(tipo === 'fecha') {

        filtro.innerHTML = `
            <label>Fecha inicio</label>

            <input
                type="date"
                id="fecha1"
            >

            <label>Fecha término</label>

            <input
                type="date"
                id="fecha2"
            >
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

async function buscarFallecidoAdmin() {

    const tipo =
        document.getElementById('tipoBusqueda').value

    let valor = ''

if(document.getElementById('valorBusqueda')){

    valor =
        document.getElementById('valorBusqueda').value
}

    let url = ''

    if(tipo === 'nombre') {

    url =
    `http://localhost:3000/consultas/fallecidos/buscar/${valor}`

}
else if(tipo === 'id') {

    url =
    `http://localhost:3000/consultas/fallecidos/detalle/${valor}`

}
else if(tipo === 'sector') {

    url =
    `http://localhost:3000/consultas/fallecidos/sector/${valor}`

}
else if(tipo === 'fecha') {

    const fecha1 =
        document.getElementById('fecha1').value

    const fecha2 =
        document.getElementById('fecha2').value

    url =
    `http://localhost:3000/consultas/fallecidos/fechas/${fecha1}/${fecha2}`
}

    const respuesta = await fetch(url)

    const datos = await respuesta.json()

    mostrarResultadosAdmin(datos)
}

function mostrarResultadosAdmin(datos) {

    const resultado =
        document.getElementById('resultadoAdmin')

    resultado.innerHTML = ''

    if(datos.length === 0){

        resultado.innerHTML =
            '<h3>No se encontraron resultados</h3>'

        return
    }

    datos.forEach(fallecido => {

        resultado.innerHTML += `
            <div>

                <h3>
                    ${
                        fallecido.nombre_fallecido ??
                        fallecido.nombre
                    }
                </h3>

                <p>
                    ID:
                    ${fallecido.id_fallecido}
                </p>

                <button
                    onclick="verDetalleAdmin(${fallecido.id_fallecido})">
                    Ver
                </button>

                <button
                    onclick="editarFallecido(${fallecido.id_fallecido})">
                    Editar
                </button>

                <button
                    onclick="eliminarFallecido(${fallecido.id_fallecido})">
                    Eliminar
                </button>


                <hr>

            </div>
        `
    })
}

async function eliminarFallecido(id) {

    const confirmar = confirm(
        '¿Está seguro que desea eliminar este fallecido?'
    )

    if(!confirmar){
        return
    }

    const respuesta = await fetch(
        `http://localhost:3000/fallecidos/${id}`,
        {
            method: 'DELETE'
        }
    )

    const datos = await respuesta.json()

    alert(datos.mensaje)

    document.getElementById(
        'valorBusqueda'
    ).value = ''

    document.getElementById(
        'resultadoAdmin'
    ).innerHTML = ''
}

async function verDetalleAdmin(id) {

    const detalleAnterior =
        document.getElementById('detalleAdmin')

    if(detalleAnterior){
        detalleAnterior.remove()
    }

    const respuesta = await fetch(
        `http://localhost:3000/consultas/fallecidos/detalle/${id}`
    )

    const datos = await respuesta.json()

    const fallecido = datos[0]

    document.getElementById('resultadoAdmin').innerHTML += `
        <div id="detalleAdmin">

            <h2>${fallecido.nombre_fallecido}</h2>

            <p>
                ID:
                ${fallecido.id_fallecido}
            </p>

            <p>
                Fecha nacimiento:
                ${new Date(
                    fallecido.fecha_nacimiento
                ).toLocaleDateString()}
            </p>

            <p>
                Fecha fallecimiento:
                ${new Date(
                    fallecido.fecha_fallecimiento
                ).toLocaleDateString()}
            </p>

            <p>
                Biografía:
                ${fallecido.biografia || 'Sin biografía'}
            </p>

            <p>
                Sector:
                ${fallecido.nombre_sector}
            </p>

            <p>
                Sepultura:
                ${fallecido.ubicacion_sepultura}
            </p>

            <p>
                ID Sector:
                ${fallecido.id_sector}
            </p>

            <p>
                ID Sepultura:
                ${fallecido.id_sepultura}
            </p>

            <hr>

        </div>
    `
}

async function editarFallecido(id) {

    const respuesta = await fetch(
        `http://localhost:3000/consultas/fallecidos/detalle/${id}`
    )

    const datos = await respuesta.json()

    const fallecido = datos[0]

    document.getElementById('resultadoAdmin').innerHTML += `
    
        <div id="editarAdmin">

            <h2>Editar Fallecido</h2>

            <input
                type="text"
                id="editarNombre"
                value="${fallecido.nombre_fallecido}"
            >

            <br><br>

            <input
                type="date"
                id="editarNacimiento"
                value="${fallecido.fecha_nacimiento.split('T')[0]}"
            >

            <br><br>

            <input
                type="date"
                id="editarFallecimiento"
                value="${fallecido.fecha_fallecimiento.split('T')[0]}"
            >

            <br><br>

            <textarea
                id="editarBiografia"
            >${fallecido.biografia || ''}</textarea>

            <br><br>

            <button
                onclick="guardarEdicion(${id})">
                Guardar cambios
            </button>

        </div>
    `
}

async function guardarEdicion(id) {

    const nombre =
        document.getElementById('editarNombre').value

    const fecha_nacimiento =
        document.getElementById('editarNacimiento').value

    const fecha_fallecimiento =
        document.getElementById('editarFallecimiento').value

    const biografia =
        document.getElementById('editarBiografia').value

    const respuestaDetalle = await fetch(
        `http://localhost:3000/fallecidos/${id}`
    )

    const detalle = await respuestaDetalle.json()

    const id_sepultura =
        detalle[0].id_sepultura

    const respuesta = await fetch(
        `http://localhost:3000/fallecidos/${id}`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre,
                fecha_nacimiento,
                fecha_fallecimiento,
                biografia,
                id_sepultura
            })
        }
    )

    const datos = await respuesta.json()

    alert(datos.mensaje)
}

function mostrarFormularioFallecido() {

    document.getElementById('contenidoAdmin').innerHTML = `
    
        <h2>Nuevo Fallecido</h2>

        <input
            type="text"
            id="nuevoNombre"
            placeholder="Nombre"
        >

        <br><br>

        <input
            type="date"
            id="fechaNacimiento"
        >

        <br><br>

        <input
            type="date"
            id="fechaFallecimiento"
        >

        <br><br>

        <textarea
            id="biografia"
            placeholder="Biografía"
        ></textarea>

        <br><br>

        <select id="idSepultura">
            <option>
                Cargando...
            </option>
        </select>

        <br><br>

        <button onclick="agregarFallecido()">
            Guardar
        </button>
    `
    cargarSepulturasAdmin()
}

async function cargarSepulturasAdmin() {

    const respuesta = await fetch(
        'http://localhost:3000/consultas/sectores/sepulturas-libres'
    )

    const datos = await respuesta.json()

    const select =
        document.getElementById('idSepultura')

    select.innerHTML = ''

    datos.forEach(sepultura => {

        select.innerHTML += `
            <option value="${sepultura.id_sepultura}">
                ${sepultura.ubicacion_sepultura}
                (${sepultura.nombre_sector})
            </option>
        `
    })
}

async function agregarFallecido() {

    const nombre =
        document.getElementById('nuevoNombre').value

    const fecha_nacimiento =
        document.getElementById('fechaNacimiento').value

    const fecha_fallecimiento =
        document.getElementById('fechaFallecimiento').value

    const biografia =
        document.getElementById('biografia').value

    const id_sepultura =
        document.getElementById('idSepultura').value

    const respuesta = await fetch(
        'http://localhost:3000/fallecidos',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre,
                fecha_nacimiento,
                fecha_fallecimiento,
                biografia,
                id_sepultura
            })
        }
    )

    const datos = await respuesta.json()

    alert(datos.mensaje)

    mostrarFallecidos()
}
