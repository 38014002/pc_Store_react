// ============================================
// CONFIGURACIÓN (Servicios de Productos)
// ============================================

// 🚨 IMPORTANTE: Ajusta esta ruta si es necesario
import { fetchWithAuth } from './Auth'; 

const BASE_URL_GESTIONPRODUCTOS = "/gestionproductos"; // Solo el endpoint relativo

// ============================================
// CRUD PROTEGIDO DE PRODUCTOS
// ============================================

/**
 * Función central para manejar la respuesta del servidor y extraer datos o errores.
 * @param {Response} res
 * @returns {Promise<any>}
 */
async function handleResponse(res) {
    // Si la solicitud falla antes de llegar al cuerpo (ej. red), fetchWithAuth lo maneja.
    
    // Si la respuesta es exitosa (200, 201, 204), devolvemos el JSON.
    if (res.ok) {
        // Manejar el caso de respuesta sin cuerpo (ej. 204 No Content para DELETE)
        if (res.status === 204) return { message: "Operación exitosa" };
        
        // Si hay cuerpo, devolver el JSON
        return await res.json();
    } else {
        // Si hay error (400, 404, 500, etc.)
        const errorData = await res.json();
        const status = res.status;
        
        // Lanzar un error con el estado y mensaje para que el try/catch lo capture.
        throw new Error(errorData.error || errorData.message || `Error del servidor: ${status}`);
    }
}


// GET todos los productos (admin)
export async function getProductosGestion() {
    try {
        // Usa fetchWithAuth: endpoint y método GET (por defecto)
        const res = await fetchWithAuth(BASE_URL_GESTIONPRODUCTOS);
        return await handleResponse(res);
    } catch (e) {
        console.error("Error al obtener productos (admin):", e);
        return { error: e.message || "Error al conectar con backend" };
    }
}

// GET producto por código
export async function getProducto(codigo) {
    try {
        // Usa fetchWithAuth: endpoint con código y método GET (por defecto)
        const res = await fetchWithAuth(`${BASE_URL_GESTIONPRODUCTOS}/${codigo}`);
        return await handleResponse(res);
    } catch (e) {
        console.error("Error al obtener producto:", e);
        return { error: e.message || "Error al conectar con backend" };
    }
}

// POST crear producto
export async function crearProducto(datosProducto) {
    try {
        // Usa fetchWithAuth: endpoint, método POST y cuerpo
        const res = await fetchWithAuth(BASE_URL_GESTIONPRODUCTOS, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' }, // Solo para indicar el cuerpo
            body: JSON.stringify(datosProducto)
        });
        return await handleResponse(res);
    } catch (e) {
        console.error("Error al crear producto:", e);
        return { error: e.message || "Error al conectar con backend" };
    }
}

// PUT actualizar producto
export async function actualizarProducto(codigo, datosProducto) {
    try {
        // Usa fetchWithAuth: endpoint, método PUT y cuerpo
        const res = await fetchWithAuth(`${BASE_URL_GESTIONPRODUCTOS}/${codigo}`, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datosProducto)
        });
        return await handleResponse(res);
    } catch (e) {
        console.error("Error al actualizar producto:", e);
        return { error: e.message || "Error al conectar con backend" };
    }
}

// DELETE eliminar producto
export async function eliminarProducto(codigo) {
    try {
        // Usa fetchWithAuth: endpoint y método DELETE
        const res = await fetchWithAuth(`${BASE_URL_GESTIONPRODUCTOS}/${codigo}`, {
            method: "DELETE"
        });
        return await handleResponse(res);
    } catch (e) {
        console.error("Error al eliminar producto:", e);
        return { error: e.message || "Error al conectar con backend" };
    }
}