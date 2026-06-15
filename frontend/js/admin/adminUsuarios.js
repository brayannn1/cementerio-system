async function mostrarUsuarios() {

    const contenido =
        document.getElementById('contenidoAdmin')

    contenido.innerHTML = `
        <h2>Gestión de Usuarios</h2>

        <button onclick="mostrarFormularioUsuario()">
            Nuevo Usuario
        </button>

        <br><br>

        <label>
            Buscar por:
        </label>

        <select
            id="tipoBusqueda"
            onchange="cambiarFiltroBusquedaUsuario()"
        >
            <option value="nombre">
                Nombre
            </option>

            <option value="id">
                ID
            </option>

            <option value="correo">
                Correo
            </option>

            <option value="rol">
                Rol
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

        <button onclick="buscarUsuarioAdmin()">
            Buscar
        </button>

        <hr>

        <div id="resultadoAdmin"></div>
    `
}

function cambiarFiltroBusquedaUsuario() {

    const tipo =
        document.getElementById('tipoBusqueda').value

    const filtro =
        document.getElementById('filtroBusqueda')

    if(tipo === 'rol') {

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

async function buscarUsuarioAdmin() {

    const tipo =
        document.getElementById('tipoBusqueda').value

    const valor =
        document.getElementById('valorBusqueda').value

    let url = ''

    if(tipo === 'id') {

        url =
        `http://localhost:3000/usuarios/${valor}`

    }

    else if(tipo === 'nombre') {

        url =
        `http://localhost:3000/consultas/usuarios/buscar/nombre/${valor}`

    }

    else if(tipo === 'correo') {

        url =
        `http://localhost:3000/consultas/usuarios/buscar/correo/${valor}`

    }

    else if(tipo === 'rol') {

        url =
        `http://localhost:3000/consultas/usuarios/buscar/rol/${valor}`

    }

    const respuesta = await fetch(url)

    const datos = await respuesta.json()

    const lista = Array.isArray(datos) ? datos : [datos]

    mostrarResultadosUsuario(lista)
}

function mostrarResultadosUsuario(datos) {

    const resultado =
        document.getElementById('resultadoAdmin')

    resultado.innerHTML = ''

    if(datos.length === 0){

        resultado.innerHTML =
            '<h3>No se encontraron resultados</h3>'

        return
    }

    datos.forEach(usuario => {

        resultado.innerHTML += `
            <div>

                <h3>
                    ${usuario.nombre}
                </h3>

                <p>
                    ID: ${usuario.id_usuario}
                </p>

                <p>
                    Correo: ${usuario.correo}
                </p>

                <p>
                    Rol: ${usuario.rol}
                </p>

                <button
                    onclick="verDetalleUsuario(${usuario.id_usuario})">
                    Ver
                </button>

                <button
                    onclick="editarUsuario(${usuario.id_usuario})">
                    Editar
                </button>

                <button
                    onclick="eliminarUsuario(${usuario.id_usuario})">
                    Eliminar
                </button>

                <hr>

            </div>
        `
    })
}

async function eliminarUsuario(id) {

    const confirmar = confirm(
        '¿Está seguro que desea eliminar este usuario?'
    )

    if(!confirmar) return

    const respuesta = await fetch(
        `http://localhost:3000/usuarios/${id}`,
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

async function verDetalleUsuario(id) {

    const detalleAnterior =
        document.getElementById('detalleAdmin')

    if(detalleAnterior){
        detalleAnterior.remove()
    }

    const respuesta = await fetch(
        `http://localhost:3000/usuarios/${id}`
    )

    const datos = await respuesta.json()

    const usuario = datos[0]

    document.getElementById('resultadoAdmin').innerHTML += `
        <div id="detalleAdmin">

            <h2>${usuario.nombre}</h2>

            <p>
                ID: ${usuario.id_usuario}
            </p>

            <p>
                Correo: ${usuario.correo}
            </p>

            <p>
                Rol: ${usuario.rol}
            </p>

            <hr>

        </div>
    `
}

async function editarUsuario(id) {

    const edicionAnterior =
        document.getElementById('editarAdmin')

    if(edicionAnterior){
        edicionAnterior.remove()
    }

    const respuesta = await fetch(
        `http://localhost:3000/usuarios/${id}`
    )

    const datos = await respuesta.json()

    const usuario = datos[0]

    document.getElementById('resultadoAdmin').innerHTML += `

        <div id="editarAdmin">

            <h2>Editar Usuario</h2>

            <input
                type="text"
                id="editarNombre"
                value="${usuario.nombre}"
                placeholder="Nombre"
            >

            <br><br>

            <input
                type="text"
                id="editarCorreo"
                value="${usuario.correo}"
                placeholder="Correo"
            >

            <br><br>

            <input
                type="password"
                id="editarContrasena"
                placeholder="Nueva contraseña (dejar vacío para no cambiar)"
            >

            <br><br>

            <select id="editarRol">

                <option value="usuario">
                    Usuario
                </option>

                <option value="admin">
                    Admin
                </option>

            </select>

            <br><br>

            <button
                onclick="guardarEdicionUsuario(${id}, '${usuario.contrasena}')">
                Guardar cambios
            </button>

        </div>
    `

    document.getElementById('editarRol').value =
        usuario.rol
}

async function guardarEdicionUsuario(id, contrasenaActual) {

    const nombre =
        document.getElementById('editarNombre').value

    const correo =
        document.getElementById('editarCorreo').value

    const contrasenaInput =
        document.getElementById('editarContrasena').value

    const rol =
        document.getElementById('editarRol').value

    const contrasena =
        contrasenaInput || contrasenaActual

    const respuesta = await fetch(
        `http://localhost:3000/usuarios/${id}`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre,
                correo,
                contrasena,
                rol
            })
        }
    )

    const datos = await respuesta.json()

    alert(datos.mensaje)
}

function mostrarFormularioUsuario() {

    document.getElementById('contenidoAdmin').innerHTML = `

        <h2>Nuevo Usuario</h2>

        <input
            type="text"
            id="nuevoNombre"
            placeholder="Nombre"
        >

        <br><br>

        <input
            type="text"
            id="nuevoCorreo"
            placeholder="Correo"
        >

        <br><br>

        <input
            type="password"
            id="nuevaContrasena"
            placeholder="Contraseña"
        >

        <br><br>

        <select id="nuevoRol">

            <option value="usuario">
                Usuario
            </option>

            <option value="admin">
                Admin
            </option>

        </select>

        <br><br>

        <button onclick="agregarUsuario()">
            Guardar
        </button>

    `
}

async function agregarUsuario() {

    const nombre =
        document.getElementById('nuevoNombre').value

    const correo =
        document.getElementById('nuevoCorreo').value

    const contrasena =
        document.getElementById('nuevaContrasena').value

    const rol =
        document.getElementById('nuevoRol').value

    if(!nombre || !correo || !contrasena) {
        alert('Complete todos los campos')
        return
    }

    const respuesta = await fetch(
        'http://localhost:3000/usuarios',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre,
                correo,
                contrasena,
                rol
            })
        }
    )

    const datos = await respuesta.json()

    alert(datos.mensaje)

    mostrarUsuarios()
}
