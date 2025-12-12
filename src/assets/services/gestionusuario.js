import { fetchWithAuth } from './Auth.js'; 
const ENDPOINT = '/gestionusuario'; 

// GET: Obtener lista de todos los usuarios
export async function getUsuarios() {
    try {
        // CORRECCIÓN CLAVE: Solamente el ENDPOINT base
        const response = await fetchWithAuth(ENDPOINT, {
            method: 'GET'
        });
        if (!response.ok) {
            throw new Error('Error al listar usuarios o acceso denegado.');
        }
        return response.json();
    } catch (error) {
        console.error("Error en getUsuarios:", error);
        throw error;
    }
}

// POST: Crear nuevo usuario
export async function createUsuario(userData) {
    try {
        if (!userData.correo || !userData.password) {
            throw new Error("Correo y contraseña son requeridos para crear un usuario.");
        }
        // Aseguramos que el tipo vaya en minúsculas para el Backend
        const dataToSend = { ...userData, tipo: userData.tipo.toLowerCase() };

        const response = await fetchWithAuth(ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dataToSend)
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Error al crear usuario');
        }
        return response.json();
    } catch (error) {
        console.error("Error en createUsuario:", error);
        throw error;
    }
}

// PUT: Actualizar usuario (usando correo como identificador)
export async function updateUsuario(correo, userData) {
    try {
        // Aseguramos que el tipo vaya en minúsculas si se incluye en la actualización
        const dataToSend = { ...userData };
        if (dataToSend.tipo) {
            dataToSend.tipo = dataToSend.tipo.toLowerCase();
        }

        const response = await fetchWithAuth(`${ENDPOINT}/${correo}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dataToSend)
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Error al actualizar usuario');
        }
        return response.json();
    } catch (error) {
        console.error("Error en updateUsuario:", error);
        throw error;
    }
}

// DELETE: Eliminar usuario (usando correo como identificador)
export async function deleteUsuario(correo) {
    try {
        const response = await fetchWithAuth(`${ENDPOINT}/${correo}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Error al eliminar usuario');
        }
        return response.json();
    } catch (error) {
        console.error("Error en deleteUsuario:", error);
        throw error;
    }
}