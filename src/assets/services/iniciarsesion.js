// ============================================
// CONFIGURACIÓN
// ============================================

const BASE_URL_BACKEND = "http://localhost:3000";
const BASE_URL_INICIARSESION = `${BASE_URL_BACKEND}/iniciarsesion`;

// ============================================
// FUNCIÓN PARA INICIAR SESIÓN
// ============================================

export async function iniciarSesion(correo, password) {
    try {
        const res = await fetch(BASE_URL_INICIARSESION, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                correo,
                password
            })
        });

        const data = await res.json();

        // Si viene token, lo guardamos
        if (data.token) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("usuario", JSON.stringify(data.usuario));
        }

        return data;

    } catch (err) {
        console.error("Error en iniciarSesion:", err);
        return { error: "No se pudo conectar con el servidor" };
    }
}
