// ============================================
// FUNCIONES PARA REGISTRO
// ============================================

const BASE_URL_REGISTRO = "/registro";

export async function registrarUsuario(datosUsuario) {
    return fetch(BASE_URL_REGISTRO, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(datosUsuario)
    })
        .then(res => res.json())
        .catch(e => console.error(e));
}

