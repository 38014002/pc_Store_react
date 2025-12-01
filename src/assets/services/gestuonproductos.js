// ============================================
// FUNCIONES PARA GESTIÓN DE PRODUCTOS
// ============================================

const BASE_URL_GESTIONPRODUCTOS = "/gestionproductos";

export async function getProductosGestion() {
    return fetch(BASE_URL_GESTIONPRODUCTOS)
        .then(res => res.json())
        .catch(e => console.error(e));
}

export async function getProducto(codigo) {
    return fetch(`${BASE_URL_GESTIONPRODUCTOS}/${codigo}`)
        .then(res => res.json())
        .catch(e => console.error(e));
}

export async function crearProducto(datosProducto) {
    return fetch(BASE_URL_GESTIONPRODUCTOS, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(datosProducto)
    })
        .then(res => res.json())
        .catch(e => console.error(e));
}

export async function actualizarProducto(codigo, datosProducto) {
    return fetch(`${BASE_URL_GESTIONPRODUCTOS}/${codigo}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(datosProducto)
    })
        .then(res => res.json())
        .catch(e => console.error(e));
}

export async function eliminarProducto(codigo) {
    return fetch(`${BASE_URL_GESTIONPRODUCTOS}/${codigo}`, {
        method: "DELETE"
    })
        .then(res => res.json())
        .catch(e => console.error(e));
}

