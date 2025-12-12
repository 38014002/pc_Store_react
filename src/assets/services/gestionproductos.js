// ============================================
// CONFIGURACIÓN
// ============================================

const BASE_URL_BACKEND = "http://localhost:3000";
const BASE_URL_GESTIONPRODUCTOS = `${BASE_URL_BACKEND}/gestionproductos`;

// Obtener token almacenado
function getToken() {
    return localStorage.getItem("token");
}

// Headers con autorización
function authHeaders() {
    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getToken()}`
    };
}

// ============================================
// CRUD PROTEGIDO DE PRODUCTOS
// ============================================

// GET todos los productos (admin)
export async function getProductosGestion() {
    try {
        const res = await fetch(BASE_URL_GESTIONPRODUCTOS, {
            headers: authHeaders()
        });
        return await res.json();
    } catch (e) {
        console.error("Error al obtener productos (admin):", e);
        return [];
    }
}

// GET producto por código
export async function getProducto(codigo) {
    try {
        const res = await fetch(`${BASE_URL_GESTIONPRODUCTOS}/${codigo}`, {
            headers: authHeaders()
        });
        return await res.json();
    } catch (e) {
        console.error("Error al obtener producto:", e);
        return null;
    }
}

// POST crear producto
export async function crearProducto(datosProducto) {
    try {
        const res = await fetch(BASE_URL_GESTIONPRODUCTOS, {
            method: "POST",
            headers: authHeaders(),
            body: JSON.stringify(datosProducto)
        });
        return await res.json();
    } catch (e) {
        console.error("Error al crear producto:", e);
        return { error: "Error al conectar con backend" };
    }
}

// PUT actualizar producto
export async function actualizarProducto(codigo, datosProducto) {
    try {
        const res = await fetch(`${BASE_URL_GESTIONPRODUCTOS}/${codigo}`, {
            method: "PUT",
            headers: authHeaders(),
            body: JSON.stringify(datosProducto)
        });
        return await res.json();
    } catch (e) {
        console.error("Error al actualizar producto:", e);
        return { error: "Error al conectar con backend" };
    }
}

// DELETE eliminar producto
export async function eliminarProducto(codigo) {
    try {
        const res = await fetch(`${BASE_URL_GESTIONPRODUCTOS}/${codigo}`, {
            method: "DELETE",
            headers: authHeaders()
        });
        return await res.json();
    } catch (e) {
        console.error("Error al eliminar producto:", e);
        return { error: "Error al conectar con backend" };
    }
}
