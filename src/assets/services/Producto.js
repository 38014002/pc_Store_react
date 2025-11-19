
const BASE_URL = "http://localhost:3000/products";

export async function getProductos() {
    return fetch(BASE_URL)
        .then(res => res.json())
        .catch(e => console.error(e));
}