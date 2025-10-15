// src/pages/Inicio.jsx
import React from 'react';
// Importaciones ajustadas para subir un nivel (..) y entrar a 'components'
// Puse Header.jsx porque no encontraba en components el Header entonces puse el nombre igual

// Componente Hero (sección principal de tu index.html)
const Hero = () => (
  <section className="hero">
    <div className="hero-text">
      <h2>TIENDA ONLINE PC STORE</h2>
      <p>Descubre nuestras mejores ofertas y productos destacados a los mejores precios.</p>
      <a href="productos.html" className="btn">Ver productos</a>
    </div>
    <div className="hero-image">
      {/* Usar la ruta relativa que tenías en tu HTML, asumiendo que el build las maneja */}
      <img src="https://img.freepik.com/fotos-premium/hombre-probando-nuevo-telefono-inteligente-interior-tienda-tecnologia_232070-5525.jpg" alt="Imagen promocional" />
    </div>
  </section>
);

// Componente ProductGrid (Productos Destacados de tu index.html)
const ProductGrid = () => (
    <section className="productos-grid">
      {/* Primer Producto Destacado */}
      <div className="producto">
        <img src="assets/css/img/shopping2.webp" alt="Placa Madre M-atx X99" />
        <h3>Placa Madre M-atx X99</h3>
        <p>$49.990</p>
      </div>
      {/* Segundo Producto Destacado */}
      <div className="producto">
        <img src="assets/css/img/shoppin.webp" alt="Disipador para CPU" />
        <h3>Disipador para CPU</h3>
        <p>$14.990</p>
      </div>
      {/* (Aquí irían más productos destacados) */}
    </section>
);


const Inicio = () => {
  return (
    <>
      <main className="container">
        <Hero />
      </main>

      {/* Título de la sección de productos destacados */}
      <h2 className="titulo-productos">Productos Destacados</h2>
      <ProductGrid />
      
      {/* Botón para ir a productos al final */}
      <div className="container" style={{ textAlign: 'center', marginBottom: '3rem' }}> 
          <a href="productos.html" className="btn" style={{width: 'auto', padding: '10px 30px'}}>Ver todos los productos</a>
      </div>

    </>
  );
};

export default Inicio;