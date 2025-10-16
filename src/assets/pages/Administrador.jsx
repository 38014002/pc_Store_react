// src/pages/Administrador.jsx
import React from 'react';

const Administrador = () => {
  return (
    <main className="container admin-container">
      <section 
        className="admin-selection" 
        style={{ textAlign: 'center', marginTop: '50px' }}
      >
        <h2>Selecciona qué gestionar</h2>
        <div style={{ marginTop: '30px' }}>
          <a 
            href="/gestion_usuario" 
            style={{
              display: 'inline-block',
              padding: '20px 40px',
              marginRight: '20px',
              backgroundColor: '#007BFF',
              color: 'white',
              borderRadius: '8px',
              textDecoration: 'none',
              fontSize: '1.2rem'
            }}
          >
            Gestionar Usuarios
          </a>
          <a 
            href="/gestion_productos" 
            style={{
              display: 'inline-block',
              padding: '20px 40px',
              backgroundColor: '#28a745',
              color: 'white',
              borderRadius: '8px',
              textDecoration: 'none',
              fontSize: '1.2rem'
            }}
          >
            Gestionar Productos
          </a>
        </div>
      </section>
    </main>
  );
};

export default Administrador;
