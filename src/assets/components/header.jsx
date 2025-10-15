// src/components/Header.jsx
import React from 'react';
import { NavLink } from 'react-router';

const Header = () => {
  return (
    <header className="site-header">
      <div className="container header-flex">
        {/* LOGO */}
        <img src="assets/css/img/img1.png" alt="Logo de MiTienda" className="logo-img" />
        <h1 className="logo">PC STORE</h1>

        {/* NAVEGACIÓN PRINCIPAL */}
        <nav className="main-nav">
         <NavLink to="/" end>Inicio</NavLink>
         <NavLink to="/Producto" end>Producto</NavLink>
          <a href="nosotros.html">Nosotros</a>
          <a href="contacto.html">Contacto</a>
        </nav>

        {/* SESIÓN Y CARRITO */}
        <div className="session">
          <a href="iniciar sesion.html">Iniciar sesión</a> | 
          <a href="registro.html">Registrar usuario</a>
          {/* El (0) será dinámico con React */}
          <a href="carrito.html" className="cart">Carrito 🛒 (0)</a>
        </div>
      </div>
    </header>
  );
};

export default Header;