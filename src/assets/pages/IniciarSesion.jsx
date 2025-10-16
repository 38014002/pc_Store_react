// src/pages/IniciarSesion.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // React Router DOM

const IniciarSesion = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); // si quieres validar contraseña

  const handleSubmit = (e) => {
    e.preventDefault(); // evita recargar la página

    const correo = email.trim();

    if (!correo) return; // si el campo está vacío, no hacer nada

    if (correo.endsWith('@duocuc.cl')) {
      // Redirige a la página de administrador
      navigate('/administrador');
    } else {
      // Redirige a la página de inicio o se queda en login
      navigate('/');
    }
  };

  return (
    <main className="container">
      <section className="form-wrap">
        <h2>Iniciar Sesión</h2>
        <form id="form-login" onSubmit={handleSubmit} autoComplete="on">
          <div className="field">
            <label htmlFor="login-email">Correo electrónico</label>
            <input
              id="login-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="ejemplo@correo.com"
            />
          </div>

          <div className="field">
            <label htmlFor="login-password">Contraseña</label>
            <input
              id="login-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Tu contraseña"
            />
          </div>

          <button type="submit">Iniciar sesión</button>
        </form>
      </section>
    </main>
  );
};

export default IniciarSesion;


