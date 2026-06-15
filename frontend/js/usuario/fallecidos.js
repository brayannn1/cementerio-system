async function mostrarFallecidos() {

    const contenido =
        document.getElementById('contenidoUsuario')

    contenido.innerHTML = `
        <h2>Buscar Fallecidos</h2>

        <label>
            Buscar por:
        </label>

        <select
            id="tipoBusqueda"
            onchange="cambiarFiltroBusqueda()"
        >
            <option value="todos">
                Todos
            </option>

            <option value="nombre">
                Nombre
            </option>

            <option value="fecha">
                Fecha de fallecimiento
            </option>

            <option value="sector">
                Sector
            </option>

        </select>

        <br><br>

        <div id="filtroBusqueda"></div>

        <button onclick="buscarFallecido()">
            Buscar
        </button>

        <hr>

        <div id="resultadoFallecidos"></div>

        <div id="detalleFallecido"></div>
    `

    await cargarTodosFallecidos()
}

function cambiarFiltroBusqueda() {

    const tipo =
        document.getElementById('tipoBusqueda').value

    const filtro =
        document.getElementById('filtroBusqueda')

    if(tipo === 'nombre') {

        filtro.innerHTML = `
            <input
                type="text"
                id="valorBusqueda"
                placeholder="Ingrese nombre"
            >
        `
    }

    else if(tipo === 'fecha') {

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

    else if(tipo === 'sector') {

        filtro.innerHTML = `
            <input
                type="text"
                id="valorBusqueda"
                placeholder="Ingrese nombre del sector"
            >
        `
    }

    else {

        filtro.innerHTML = ''
    }
}

async function buscarFallecido() {

    const tipo =
        document.getElementById('tipoBusqueda').value

    document.getElementById('detalleFallecido').innerHTML = ''

    let url = ''

    if(tipo === 'todos') {

        await cargarTodosFallecidos()
        return
    }

    else if(tipo === 'nombre') {

        const valor =
            document.getElementById('valorBusqueda').value

        url =
        `http://localhost:3000/consultas/fallecidos/buscar/${valor}`
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
        `http://localhost:3000/consultas/fallecidos/fechas/${fecha1}/${fecha2}`
    }

    else if(tipo === 'sector') {

        const valor =
            document.getElementById('valorBusqueda').value

        url =
        `http://localhost:3000/consultas/fallecidos/sector/${valor}`
    }

    const respuesta = await fetch(url)

    const datos = await respuesta.json()

    mostrarResultadosFallecidos(datos)
}

async function cargarTodosFallecidos() {

    const respuesta = await fetch(
        'http://localhost:3000/consultas/fallecidos'
    )

    const datos = await respuesta.json()

    mostrarResultadosFallecidos(datos)
}

function formatearFecha(fecha) {

    if(!fecha) return 'Sin fecha'

    return new Date(fecha).toLocaleDateString('es-CL', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    })
}

function mostrarResultadosFallecidos(datos) {

    const resultado =
        document.getElementById('resultadoFallecidos')

    resultado.innerHTML = ''

    if(datos.length === 0) {

        resultado.innerHTML =
            '<h3>No se encontraron resultados</h3>'

        return
    }

    datos.forEach(fallecido => {

        resultado.innerHTML += `
            <div>

                <h3>${fallecido.nombre_fallecido}</h3>

                <p>
                    Nacimiento:
                    ${formatearFecha(fallecido.fecha_nacimiento)}
                </p>

                <p>
                    Fallecimiento:
                    ${formatearFecha(fallecido.fecha_fallecimiento)}
                </p>

                <p>
                    Sector:
                    ${fallecido.nombre_sector || fallecido.ubicacion_sector || 'Sin sector'}
                </p>

                <p>
                    Sepultura:
                    ${fallecido.ubicacion_sepultura}
                </p>

                <button
                    onclick="verDetalleFallecido(${fallecido.id_fallecido})">
                    Ver detalle
                </button>

                <hr>

            </div>
        `
    })
}

async function verDetalleFallecido(id) {

    const respuesta = await fetch(
        `http://localhost:3000/consultas/fallecidos/detalle/${id}`
    )

    const datos = await respuesta.json()

    const fallecido = datos[0]

    const detalle =
        document.getElementById('detalleFallecido')

    // Mostrar detalle + mapa juntos
    detalle.innerHTML = `
        <h2>${fallecido.nombre_fallecido}</h2>

        <p>
            Fecha nacimiento:
            ${formatearFecha(fallecido.fecha_nacimiento)}
        </p>

        <p>
            Fecha fallecimiento:
            ${formatearFecha(fallecido.fecha_fallecimiento)}
        </p>

        <p>
            Biografia:
            ${fallecido.biografia || 'Sin biografia registrada'}
        </p>

        <p>
            Sector: ${fallecido.nombre_sector}
        </p>

        <p>
            Ubicacion sepultura:
            ${fallecido.ubicacion_sepultura}
        </p>

        <hr>

        <h3>Mapa del cementerio</h3>

        <p>
            Verde = Disponible &nbsp;|&nbsp;
            Rojo = Ocupada &nbsp;|&nbsp;
            Morado = Ubicacion del fallecido
        </p>

        <div id="mapaCementerio"></div>
    `

    detalle.scrollIntoView({ behavior: 'smooth' })

    // Primero cargar el mapa, despues resaltar
    await cargarMapaEnDetalle(fallecido.id_sepultura)
}

async function cargarMapaEnDetalle(idSepulturaResaltar) {

    const respuesta = await fetch(
        'http://localhost:3000/sepulturas'
    )

    const sepulturas = await respuesta.json()

    const mapa =
        document.getElementById('mapaCementerio')

    if(!mapa) return

    mapa.innerHTML = ''

    sepulturas.forEach(sepultura => {

        // Si es la sepultura del fallecido, ponerla morada directamente
        if(sepultura.id_sepultura === idSepulturaResaltar) {

            mapa.innerHTML += `
                <div
                    id="sepultura-${sepultura.id_sepultura}"
                    class="sepultura resaltada"
                    onclick="verSepulturaMapa(${sepultura.id_sepultura})"
                >
                    ${sepultura.ubicacion_sepultura}
                </div>
            `
        }

        else {

            const clase =
                sepultura.estado?.toLowerCase() === 'ocupada'
                ? 'ocupada'
                : 'libre'

            mapa.innerHTML += `
                <div
                    id="sepultura-${sepultura.id_sepultura}"
                    class="sepultura ${clase}"
                    onclick="verSepulturaMapa(${sepultura.id_sepultura})"
                >
                    ${sepultura.ubicacion_sepultura}
                </div>
            `
        }
    })
}

function resaltarSepultura(idSepultura) {

    document
        .querySelectorAll('.sepultura')
        .forEach(s => s.classList.remove('resaltada'))

    const objetivo =
        document.getElementById(`sepultura-${idSepultura}`)

    if(objetivo) {
        objetivo.classList.add('resaltada')
    }
}
