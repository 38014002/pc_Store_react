import { fetchWithAuth } from "./Auth.js";

const BASE_URL = "/products";

export async function getProductos() {
    return fetchWithAuth(BASE_URL)
        .then(res => res.json())
        .catch(e => console.error(e));
}