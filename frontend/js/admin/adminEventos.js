async function mostrarEventos() {
    const contenido = document.getElementById('contenidoAdmin')

    contenido.innerHTML = 
    `<h2>Gestion de Eventos</h2>
    
    <button onclick="mostrarFormularioEventos()">
        Nuevo Evento
        </button>
        
        <br><br>
        
        <label>
        Buscar por:
        </label>
        
        <select 
        id="tipoBusqueda"
        onchange="cambiarFiltroBusquedaEvento()"
        >
        
        <option value="titulo">
        Nombre
        </option>

        <option value="id">
        ID
        </option>

        <option value="fecha">
        Fecha
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
        
        <button onclick="buscarEventoAdmin()">
        Buscar
        </button>
        
        <hr>
        
        <div id="resultadoAdmin"></div>
        `
}

function cambiarFiltroBusquedaEvento() {
    const tipo = document.getElementById('tipoBusqueda').value
    const filtro = document.getElementById('filtroBusqueda')

    if (tipo === 'fecha') {
        filtro.innerHTML = `
            <label>Desde:</label>
            <input type="date" id="fecha1">
            <label>Hasta:</label>
            <input type="date" id="fecha2">
        `
    } else if (tipo === 'id') {
        filtro.innerHTML = `
            <input 
            type="number" 
            id="valorBusqueda" 
            placeholder="Ingrese ID del evento"
            >
        `
    } else {
        filtro.innerHTML = `
            <input 
            type="text" 
            id="valorBusqueda" 
            placeholder="Ingrese título a buscar"
            >
        `
    }
}

async function buscarEventoAdmin() {
    const tipo = document.getElementById('tipoBusqueda').value
    let url = ''

    if(tipo === 'titulo') {
        const valor = document.getElementById('valorBusqueda').value
        url =
        `http://localhost:3000/consultas/eventos/buscar/${valor}`
    }

    else if(tipo === 'id') {
        const valor = document.getElementById('valorBusqueda').value
        url =
        `http://localhost:3000/eventos/${valor}`
    }

    else if(tipo === 'fecha') {

        const fecha1 = document.getElementById('fecha1').value

        const fecha2 = document.getElementById('fecha2').value

        if (!fecha1 || !fecha2) {
            alert("Por favor seleccione ambas fechas")
            return
        }

        url =
        `http://localhost:3000/consultas/eventos/fechas/${fecha1}/${fecha2}`
    }

    const respuesta = await fetch(url)

    const datos = await respuesta.json()

    const lista = Array.isArray(datos) ? datos : [datos]

    mostrarResultadosEvento(datos)
}

function formatearFecha(fecha) {

    if(!fecha) return 'Sin fecha'

    return new Date(fecha).toLocaleDateString('es-CL', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    })
}

function mostrarResultadosEvento(datos) {
    const resultado = document.getElementById('resultadoAdmin')

    resultado.innerHTML = ''

    if(datos.length === 0){
        resultado.innerHTML =
        '<h3>No se encontraron resultados</h3>'
        return
    }

    datos.forEach(evento => {
        resultado.innerHTML += `
        <div> 
            <h3>${evento.titulo}</h3>
            
            <p>ID:${evento.id_evento}</p>
            <p>Fecha:${formatearFecha(evento.fecha_evento)}</p>

            <button onclick="verDetalleEvento(${evento.id_evento})">
                Ver
                </button>
                
            <button onclick="editarEvento(${evento.id_evento})">
                Editar
                </button>
                
            <button onclick="eliminarEvento(${evento.id_evento})">
                Eliminar
                </button>
                
                <hr>
                
            </div>
            `
    })
}

async function eliminarEvento(id) {
    const confirmar = confirm('Estas seguro que deas eliminar este evento?')
    if (!confirmar) return

    const respuesta = await fetch(`http://localhost:3000/eventos/${id}`, {
        method : 'DELETE'
    })

    const datos = await respuesta.json()
    alert(datos.mensaje)
""
    document.getElementById('resultadoAdmin').innerHTML = ''
}

async function verDetalleEvento(id) {
    const detalleAnterior = document.getElementById('detalleAdmin')

    if(detalleAnterior) {
        detalleAnterior.remove()
    }

    const respuesta = await fetch(`http://localhost:3000/eventos/${id}`)
    const datos = await respuesta.json()

    const evento = datos[0]

    document.getElementById('resultadoAdmin').innerHTML +=`
    <div id="detalleAdmin">

        <h2>Detalle: ${evento.titulo}</h2>

        <p>ID: ${evento.id_evento}</p>
        <p>Descripcion: ${evento.descripcion}</p>
        <p>Fecha: ${formatearFecha(evento.fecha_evento)}</p>

        <hr>

        </div>
    `
}

async function editarEvento(id) {
    const edicionAnterior = document.getElementById('editarAdmin')
    if (edicionAnterior) edicionAnterior.remove()

    const respuesta = await fetch(`http://localhost:3000/eventos/${id}`)
    const datos = await respuesta.json()
    
    const evento = datos[0]



    document.getElementById('resultadoAdmin').innerHTML += `
        <div id="editarAdmin">
            <h2>Editar Evento</h2>

            <input type="text" id="editarTitulo" value="${evento.titulo}" placeholder="Título">
            <br><br>
            <textarea id="editarDescripcion" placeholder="Descripción">${evento.descripcion}</textarea>
            <br><br>
            <input type="date" id="editarFecha" value="${evento.fecha_evento ? evento.fecha_evento.split('T')[0] : ''}">
            <br><br>

            <button onclick="guardarEdicionEvento(${id})">
            Guardar cambios
            </button>
        </div>
    `
}

async function guardarEdicionEvento(id) {
    const titulo = document.getElementById('editarTitulo').value
    const descripcion = document.getElementById('editarDescripcion').value
    const fecha_evento = document.getElementById('editarFecha').value

    if (!titulo || !descripcion || !fecha_evento) {
        alert('Complete todos los campos')
        return
    }

    const respuesta = await fetch(`http://localhost:3000/eventos/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            titulo,
            descripcion,
            fecha_evento
        })
    })

    const datos = await respuesta.json()
    alert(datos.mensaje)
}

function mostrarFormularioEventos() {
    document.getElementById('contenidoAdmin').innerHTML = `
        <h2>Nuevo Evento</h2>

        <input 
        type="text" 
        id="nuevoTitulo" 
        placeholder="Título del Evento"
        >
        <br><br>

        <textarea 
        id="nuevaDescripcion" 
        placeholder="Descripción del Evento">
        </textarea>

        <br><br>

        <input 
        type="date" 
        id="nuevaFecha"
        >
        <br><br>

        <button onclick="agregarEvento()">
        Guardar
        </button>
    `
}

async function agregarEvento() {
    const titulo = document.getElementById('nuevoTitulo').value
    const descripcion = document.getElementById('nuevaDescripcion').value
    const fecha_evento = document.getElementById('nuevaFecha').value

    if (!titulo || !descripcion || !fecha_evento) {
        alert('Complete todos los campos')
        return
    }

    const respuesta = await fetch('http://localhost:3000/eventos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            titulo,
            descripcion,
            fecha_evento
        })
    })

    const datos = await respuesta.json()
    alert(datos.mensaje)

    mostrarEventos()
}
