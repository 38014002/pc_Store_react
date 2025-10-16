// src/pages/Carrito.jsx
import React from 'react';

const Carrito = () => {
  return (
    <main className="container">
      <h1>Tu Carrito</h1>

      {/* Mensaje si no hay productos */}
      <div id="mensaje-vacio">
        <p>No hay productos en el carrito.</p>
      </div>

      {/* Lista de productos (añadidos dinámicamente) */}
      <section id="lista-carrito" style={{ display: 'none' }}></section>

      {/* Total y acciones */}
      <section id="total-carrito" style={{ display: 'none' }}>
        <h2>
          Total: $<span id="total">0</span>
        </h2>
        <div className="cart-actions">
          <a href="/productos" className="btn">← Seguir comprando</a>
          <button className="btn">Finalizar compra</button>
        </div>
      </section>
    </main>
  );
};

export default Carrito;
