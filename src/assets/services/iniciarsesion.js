// ============================================
// FUNCIONES PARA INICIAR SESIÓN
// ============================================

const BASE_URL_INICIARSESION = "/iniciarsesion";

export async function iniciarSesion(email, password) {
    return fetch(BASE_URL_INICIARSESION, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    })
        .then(res => res.json())
        .catch(e => console.error(e));
}

