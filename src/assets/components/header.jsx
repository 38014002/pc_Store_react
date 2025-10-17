// src/components/Header.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header className="site-header">
      <div className="container header-flex">
        {/* LOGO */}
        <img src="img/img1.png" alt="Logo de MiTienda" className="logo-img" />
        <h1 className="logo">PC STORE</h1>

        {/* NAVEGACIÓN PRINCIPAL */}
        <nav className="main-nav">
         <NavLink to="/" end>Inicio</NavLink>
         <NavLink to="/Producto" end>Productos</NavLink>
        <NavLink to="/nosotros">Nosotros</NavLink>
        <NavLink to="/contacto">Contacto</NavLink>
        </nav>


        {/* SESIÓN Y CARRITO */}
      <div className="session">
        <NavLink to="/iniciar-sesion">Iniciar sesión</NavLink> | 
        <NavLink to="/registro">Registrar usuario</NavLink>
          {/* El (0) será dinámico con React */}
        <NavLink to="/carrito" className="cart">Carrito 🛒 (0)</NavLink>
        </div>
      </div>
    </header>
  );
};

export default Header;


