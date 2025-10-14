// src/components/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        {/* SECCIÓN DE REDES SOCIALES */}
        <div>
          <h4>Redes Sociales</h4>
          <a href="#">Instagram</a><br />
          <a href="#">Facebook</a><br />
          <a href="#">Tik Tok</a>
        </div>

        {/* SECCIÓN DE NEWSLETTER */}
        <div>
          <h4>Newsletter</h4>
          <form>
            <input type="email" placeholder="Ingresa tu email" />
            <button type="submit">Suscribirse</button>
          </form>
        </div>

        {/* COPYRIGHT */}
        <div>
          <p>&copy; 2025 PCSTORE. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;