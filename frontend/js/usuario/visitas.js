const TIPOS_VISITA = [
    'Mantenimiento',
    'Aniversario del fallecido',
    'Duelo / Emocional',
    'Otro'
]

function mostrarFormularioVisita() {

    const contenido =
        document.getElementById('contenidoUsuario')

    const opciones = TIPOS_VISITA.map(t =>
        `<option value="${t}">${t}</option>`
    ).join('')

    contenido.innerHTML = `
        <h2>Registrar visita</h2>

        <label>
            Motivo de la visita:
        </label>

        <br><br>

        <select id="tipoVisita">
            ${opciones}
        </select>

        <br><br>

        <button onclick="registrarVisita()">
            Registrar
        </button>
    `
}

async function registrarVisita() {

    const tipo_visita =
        document.getElementById('tipoVisita').value

    const usuario =
        JSON.parse(localStorage.getItem('usuario'))

    const fecha_visita =
        new Date().toISOString().split('T')[0]

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
                id_usuario: usuario.id_usuario
            })
        }
    )

    const datos = await respuesta.json()

    alert(datos.mensaje)
}
