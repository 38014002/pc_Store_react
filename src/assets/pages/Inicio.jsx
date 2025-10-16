// src/pages/Inicio.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importamos useNavigate

// Componente Hero (sección principal de tu index.html)
const Hero = ({ irAProductos }) => (
  <section className="hero">
    <div className="hero-text">
      <h2>TIENDA ONLINE PC STORE</h2>
      <p>Descubre nuestras mejores ofertas y productos destacados a los mejores precios.</p>
      <button className="btn" onClick={irAProductos}>Ver productos</button>
    </div>
    <div className="hero-image">
      <img src="https://img.freepik.com/fotos-premium/hombre-probando-nuevo-telefono-inteligente-interior-tienda-tecnologia_232070-5525.jpg" alt="Imagen promocional" />
    </div>
  </section>
);

// Componente ProductGrid (Productos Destacados)
const ProductGrid = () => (
  <section className="productos-grid">
    <div className="producto">
      <img src="img/shopping2.webp" alt="Placa Madre M-atx X99" />
      <h3>Placa Madre M-atx X99</h3>
      <p>$49.990</p>
    </div>
    <div className="producto">
      <img src="img/shoppin.webp" alt="Disipador para CPU" />
      <h3>Disipador para CPU</h3>
      <p>$14.990</p>
    </div>
  </section>
);

const Inicio = () => {
  const navigate = useNavigate(); // Inicializamos navigate

  // Función para ir a la página de productos
  const irAProductos = () => {
    navigate('/producto'); // Cambia a la ruta definida en App.jsx
  };

  return (
    <>
      <main className="container">
        <Hero irAProductos={irAProductos} />
      </main>

      <h2 className="titulo-productos">Productos Destacados</h2>
      <ProductGrid />

      <div className="container" style={{ textAlign: 'center', marginBottom: '3rem' }}> 
        <button className="btn" onClick={irAProductos}>Ver todos los productos</button>
      </div>
    </>
  );
};

export default Inicio;

