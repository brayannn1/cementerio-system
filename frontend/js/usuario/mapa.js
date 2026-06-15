async function mostrarMapa() {
    const contenido =
        document.getElementById('contenidoUsuario')

    contenido.innerHTML = `
        <h2>Mapa del Cementerio</h2>

        <div class="leyendaMapa">

        <span class="leyenda libre">
            Disponible
            </span>
        
        <span class="leyenda ocupada">
            Ocupada
            </span>

        <span class="leyenda resaltada">
            Ubicacion del fallecido
            </span>
            </div>

        <hr>

        <div id="mapaCementerio"></div>
    
        <div id="detalleMapa"></div>
    `

    await cargarMapa()
}

async function cargarMapa() {

    const respuesta = await fetch(
        'http://localhost:3000/sepulturas'
    )

    const sepulturas =
        await respuesta.json()

    const mapa =
        document.getElementById(
            'mapaCementerio'
        )

    mapa.innerHTML = ''

    sepulturas.forEach(sepultura => {

        const clase =
            sepultura.estado?.toLowerCase() === 'ocupada'
            ? 'ocupada'
            : 'libre'

        mapa.innerHTML += `
            <div
                id="sepultura-${sepultura.id_sepultura}"
                class="sepultura ${clase}"
                onclick="
                    verSepulturaMapa(
                        ${sepultura.id_sepultura}
                    )
                "
            >
                ${sepultura.ubicacion_sepultura}
            </div>
        `
    })
}

async function verSepulturaMapa(id) {

    const respuesta = await fetch(
        `http://localhost:3000/sepulturas/${id}`
    )

    const datos =
        await respuesta.json()

    const sepultura =
        datos[0]

    document.getElementById(
        'detalleMapa'
    ).innerHTML = `
        <hr>

        <h3>
            ${sepultura.ubicacion_sepultura}
        </h3>

        <p>
            Estado:
            ${sepultura.estado}
        </p>

        <p>
            Sector:
            ${sepultura.id_sector}
        </p>
    `
}