// src/pages/Productos.jsx
import React, { useState } from 'react';

const productosData = [
  {
    id: 1,
    nombre: "Cpu Ryzen 5 5600g",
    precio: 109990,
    imagen: "/img/amd-5600g-1.png",
  },
  {
    id: 2,
    nombre: "Placa Madre B460M DS3H V2",
    precio: 136990,
    imagen: "/img/img.webp",
  },
  {
    id: 3,
    nombre: "Tarjeta de video NVIDIA GeForce RTX 5090",
    precio: 89990,
    imagen: "/img/img1.webp",
  },
  {
    id: 4,
    nombre: "PC Gamer V6 AMD Ryzen 5 5500",
    precio: 119990,
    imagen: "/img/IMG2.webp",
  },
  {
    id: 5,
    nombre: "Kingston Memoria RAM FURY Beast DDR5",
    precio: 19990,
    imagen: "/img/imagen1.webp",
  },
  {
    id: 6,
    nombre: "Procesador Intel Core Ultra 5 245KF",
    precio: 319990,
    imagen: "/img/imagen2.webp",
  },
  {
    id: 7,
    nombre: "Ventilador Gabinete PC Kronos Eurus, ARGB, 120mm, PWM, Black",
    precio: 19990,
    imagen: "/img/imagen3.webp",
  },
  {
    id: 8,
    nombre: "Fuente de Poder Corsair RM1000e",
    precio: 219990,
    imagen: "/img/imagen4.webp",
  },
  {
    id: 9,
    nombre: "Placa Madre M-atx X99",
    precio: 49990,
    imagen: "/img/shopping2.webp",
  },
  {
    id: 10,
    nombre: "Disipador para CPU",
    precio: 14990,
    imagen: "/img/shoppin.webp",
  },
  {
    id: 11,
    nombre: "Placa Madre E-atx",
    precio: 20000,
    imagen: "/img/shoppi.webp",
  },
  {
    id: 12,
    nombre: "Combo Setup Gamer: PC Warrior 3050, Monitor, Silla gamer, Alfombra, y periférico",
    precio: 499990,
    imagen: "/img/sh.webp",
  },
];

const Productos = () => {
  const [search, setSearch] = useState("");

  // Filtra productos por nombre, asegurando que nombre siempre sea string
  const productosFiltrados = productosData.filter((producto) =>
    (producto.nombre || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="container">
      {/* Barra de búsqueda */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar producto..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Grid de productos */}
      <section className="grid">
        {productosFiltrados.map((producto) => (
          <article key={producto.id} className="card" data-id={producto.id}>
            <img src={producto.imagen} alt={producto.nombre} />
            <h3 className="nombre-producto">{producto.nombre}</h3>
            <p className="price precio-producto">
              ${producto.precio.toLocaleString()}
            </p>
            <button type="button" className="btn-agregar">
              Agregar al carrito
            </button>
          </article>
        ))}
      </section>
    </main>
  );
};

export default Productos;

