async function buscarFallecido() {

    document.getElementById('detalle').innerHTML = ''

    const nombre =
        document.getElementById('nombre').value

    const respuesta = await fetch(
        `http://localhost:3000/consultas/fallecidos/buscar/${nombre}`
    )

    const datos = await respuesta.json()

    mostrarResultados(datos)
}

async function cargarFallecidos() {
    document.getElementById('detalle').innerHTML = ''

    const respuesta = await fetch(
        'http://localhost:3000/consultas/fallecidos'
    )

    const datos = await respuesta.json()

    mostrarResultados(datos)
}
async function verDetalle(id) {

    const respuesta = await fetch(
        `http://localhost:3000/consultas/fallecidos/detalle/${id}`
    )

    const datos = await respuesta.json()

    const fallecido = datos[0]

    document.getElementById('detalle').innerHTML = `
        <h2>${fallecido.nombre_fallecido}</h2>

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
            ${fallecido.biografia || 'Sin biografia registrada'}
        </p>

        <p>
            Sector:
            ${fallecido.nombre_sector}
        </p>

        <p>
            Ubicación:
            ${fallecido.ubicacion_sepultura}
        </p>
    `
    document.getElementById('detalle').scrollIntoView({
    behavior: 'smooth'
})
}

async function buscarSector() {

    document.getElementById('detalle').innerHTML = ''  

    const sector =
        document.getElementById('sector').value

    const respuesta = await fetch(
        `http://localhost:3000/consultas/fallecidos/sector/${sector}`
    )

    const datos = await respuesta.json()

    mostrarResultados(datos)
}

function mostrarResultados(datos) {

    const resultado =
        document.getElementById('resultado')

    resultado.innerHTML = ''

    if(datos.length === 0) {

        resultado.innerHTML = `
            <h3>No se encontraron resultados</h3>
        `

        return
    }

    datos.forEach(fallecido => {

        const nacimiento =
            new Date(
                fallecido.fecha_nacimiento
            ).toLocaleDateString()

        const fallecimiento =
            new Date(
                fallecido.fecha_fallecimiento
            ).toLocaleDateString()

        resultado.innerHTML += `
            <div>

                <h3>${fallecido.nombre_fallecido}</h3>

                <p>Nacimiento: ${nacimiento}</p>

                <p>Fallecimiento: ${fallecimiento}</p>

                <p>Sector:
                    ${
                        fallecido.nombre_sector ??
                        fallecido.ubicacion_sector
                    }
                </p>

                <p>
                    Sepultura:
                    ${fallecido.ubicacion_sepultura}
                </p>

                <button
                    onclick="verDetalle(${fallecido.id_fallecido})">
                    Ver detalle
                </button>

                <hr>

            </div>
        `
    })
}

async function buscarFechas() {

    document.getElementById('detalle').innerHTML = ''

    const fecha1 =
        document.getElementById('fecha1').value

    const fecha2 =
        document.getElementById('fecha2').value

    const respuesta = await fetch(
        `http://localhost:3000/consultas/fallecidos/fechas/${fecha1}/${fecha2}`
    )

    const datos = await respuesta.json()

    mostrarResultados(datos)
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

    cargarFallecidos()

    document.getElementById('nuevoNombre').value = ''
    document.getElementById('fechaNacimiento').value = ''
    document.getElementById('fechaFallecimiento').value = ''
    document.getElementById('biografia').value = ''
    document.getElementById('idSepultura').value = ''
}

async function cargarSepulturas() {

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


cargarFallecidos()
cargarSepulturas()