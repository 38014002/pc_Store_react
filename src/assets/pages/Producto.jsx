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

  // Filtrar productos por búsqueda
  const productosFiltrados = productosData.filter((producto) =>
    producto.nombre.toLowerCase().includes(search.toLowerCase())
  );

  // Agregar producto al carrito
  const agregarAlCarrito = (producto) => {
    if (!carrito.some((item) => item.id === producto.id)) {
      setCarrito([...carrito, producto]);
      alert(`${producto.nombre} agregado al carrito`);
    } else {
      alert("El producto ya está en el carrito");
    }
  };

  return (
    <main className="container">
      <h1>Productos</h1>

      {/* Buscador */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar producto..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Lista de productos */}
      <section className="grid">
        {productosFiltrados.map((producto) => (
          <article key={producto.id} className="card">
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

      {/* Botón para ir al carrito */}
      <div style={{ marginTop: "20px" }}>
        <button onClick={() => navigate("/carrito")}>
          Ver carrito ({carrito.length})
        </button>
      </div>
    </main>
  );
};

export default Productos;
