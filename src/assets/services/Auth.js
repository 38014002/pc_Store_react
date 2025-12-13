// src/services/Auth.js

const API_BASE_URL = 'http://localhost:3000';

// ============================================
// 1. LOGIN / LOGOUT / SESSION
// ============================================

export async function login(correo, password) {
    const response = await fetch(`${API_BASE_URL}/iniciarsesion`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo, password })
    });

    const data = await response.json();

    if (response.ok && data.success) {
        localStorage.setItem('jwt_token', data.token);
        localStorage.setItem('user_info', JSON.stringify(data.usuario));
        return data.usuario;
    } else {
        throw new Error(data.error || 'Fallo en la autenticación.');
    }
}

export function logout() {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('user_info');
}

export function getCurrentUser() {
    const userInfo = localStorage.getItem('user_info');
    return userInfo ? JSON.parse(userInfo) : null;
}

export function checkUserRole(requiredRole) {
    const user = getCurrentUser();
    return user && user.tipo.toLowerCase() === requiredRole.toLowerCase();
}

// ============================================
// 2. fetchWithAuth → Agrega JWT automáticamente
// ============================================

export async function fetchWithAuth(endpoint, options = {}) {
    const token = localStorage.getItem('jwt_token');

    if (!token) {
        throw new Error("No autenticado. Por favor inicie sesión.");
    }

    const headers = {
        ...options.headers,
        'Authorization': `Bearer ${token}`
    };

    const finalOptions = { ...options, headers };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, finalOptions);

    if (response.status === 401 || response.status === 403) {
        logout();
        throw new Error("Sesión expirada o acceso denegado.");
    }

    return response;
}
