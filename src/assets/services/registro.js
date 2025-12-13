// ============================================
// CONFIGURACIÓN
// ============================================

const BASE_URL_BACKEND = "http://localhost:3000";  
const BASE_URL_REGISTRO = `${BASE_URL_BACKEND}/registro`;

// ============================================
// FUNCIÓN PARA REGISTRO
// ============================================

export async function registrarUsuario({ nombre, email, password, password2  }) {
    try {
        const res = await fetch(BASE_URL_REGISTRO, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nombre,
                email,
                password,
                password2
            })
        });

        return await res.json();
    } catch (err) {
        console.error("Error en registrarUsuario:", err);
        return { error: "Error de conexión con el servidor" };
    }
}
