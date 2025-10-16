// src/pages/Registro.jsx
import React from 'react';

const Registro = () => {
  return (
    <main className="container">
      <section className="form-wrap">
        <h2>Crea tu cuenta</h2>
        <form id="form-registro" noValidate autoComplete="on">
          {/* Nombre completo */}
          <div className="field">
            <label htmlFor="nombre">Nombre completo</label>
            <input
              id="nombre"
              name="nombre"
              type="text"
              required
              placeholder="Ej: Daniela Pérez"
              autoComplete="name"
            />
            <small className="error" id="err-nombre"></small>
          </div>

          {/* Correo electrónico */}
          <div className="field">
            <label htmlFor="email">Correo electrónico</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="ejemplo@correo.com"
              autoComplete="email"
            />
            <small className="error" id="err-email"></small>
          </div>

          {/* Contraseña */}
          <div className="field">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              minLength={6}
              placeholder="Mínimo 6 caracteres"
              autoComplete="new-password"
            />
            <small className="error" id="err-password"></small>
          </div>

          {/* Confirmar contraseña */}
          <div className="field">
            <label htmlFor="password2">Repite la contraseña</label>
            <input
              id="password2"
              name="password2"
              type="password"
              required
              autoComplete="new-password"
            />
            <small className="error" id="err-password2"></small>
          </div>

          {/* Aceptar términos */}
          <div className="field checkbox">
            <input id="tyc" name="tyc" type="checkbox" required />
            <label htmlFor="tyc">Acepto Términos y Condiciones</label>
            <small className="error" id="err-tyc"></small>
          </div>

          {/* Botón */}
          <button type="submit">Crear cuenta</button>
        </form>
      </section>
    </main>
  );
};

export default Registro;
