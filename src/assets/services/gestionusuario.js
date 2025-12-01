// ============================================
// FUNCIONES PARA GESTIÓN DE USUARIOS
// ============================================

const BASE_URL_GESTIONUSUARIO = "/gestionusuario";

export async function getUsuarios() {
    return fetch(BASE_URL_GESTIONUSUARIO)
        .then(res => res.json())
        .catch(e => console.error(e));
}

export async function getUsuario(run) {
    return fetch(`${BASE_URL_GESTIONUSUARIO}/${run}`)
        .then(res => res.json())
        .catch(e => console.error(e));
}

export async function crearUsuario(datosUsuario) {
    return fetch(BASE_URL_GESTIONUSUARIO, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(datosUsuario)
    })
        .then(res => res.json())
        .catch(e => console.error(e));
}

export async function actualizarUsuario(run, datosUsuario) {
    return fetch(`${BASE_URL_GESTIONUSUARIO}/${run}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(datosUsuario)
    })
        .then(res => res.json())
        .catch(e => console.error(e));
}

export async function eliminarUsuario(run) {
    return fetch(`${BASE_URL_GESTIONUSUARIO}/${run}`, {
        method: "DELETE"
    })
        .then(res => res.json())
        .catch(e => console.error(e));
}

