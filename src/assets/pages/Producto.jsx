// src/pages/Productos.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProductos } from '../services/Producto';

const Productos = ({ carrito, setCarrito }) => {
  const [search, setSearch] = useState("");
  const [productosData, setProductosData] = useState([]);

  useEffect(() => {
    getProductos().then(productos => setProductosData(productos))
  }, []);

  const navigate = useNavigate();

  const productosFiltrados = productosData.filter((producto) =>
    producto.nombre.toLowerCase().includes(search.toLowerCase())
  );

  const agregarAlCarrito = (producto) => {
    // <<< CAMBIO AQUÍ: Usamos .codigo en lugar de .id
    if (!carrito.some((item) => item.codigo === producto.codigo)) {
      setCarrito([...carrito, producto]);
      alert(`${producto.nombre} agregado al carrito`);
    } else {
      alert("El producto ya está en el carrito");
    }
  };

  return (
    <main className="container">
      <h1>Productos</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar producto..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <section className="grid">
        {productosFiltrados.map((producto) => (
          // <<< CAMBIO AQUÍ: La 'key' debe ser única, usamos el código
          <article key={producto.codigo} className="card">
            <img src={producto.imagen} alt={producto.nombre} />
            <h3 className="nombre-producto">{producto.nombre}</h3>
            <p className="price">${producto.precio.toLocaleString()}</p>
            <button
              className="btn-agregar"
              onClick={() => agregarAlCarrito(producto)}
            >
              Agregar al carrito
            </button>
          </article>
        ))}
      </section>
      <div style={{ marginTop: "20px" }}>
        <button onClick={() => navigate("/carrito")}>
          Ver carrito ({carrito.length})
        </button>
      </div>
    </main>
  );
};

export default Productos;