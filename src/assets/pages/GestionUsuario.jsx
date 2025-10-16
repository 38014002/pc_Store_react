// src/pages/GestionUsuarios.jsx
import React from 'react';

const GestionUsuarios = () => {
  return (
    <main className="container admin-container">
      {/* FORMULARIO DE USUARIO */}
      <section className="admin-form">
        <h2>Agregar / Editar Usuario</h2>
        <form id="form-usuario" noValidate>
          <div className="field">
            <label htmlFor="usuario-run">RUN</label>
            <input type="text" id="usuario-run" required />
          </div>
          <div className="field">
            <label htmlFor="usuario-nombre">Nombre</label>
            <input type="text" id="usuario-nombre" required />
          </div>
          <div className="field">
            <label htmlFor="usuario-apellidos">Apellidos</label>
            <input type="text" id="usuario-apellidos" required />
          </div>
          <div className="field">
            <label htmlFor="usuario-correo">Correo</label>
            <input type="email" id="usuario-correo" required placeholder="usuario@duoc.cl" />
          </div>
          <div className="field">
            <label htmlFor="usuario-tipo">Tipo de Usuario</label>
            <select id="usuario-tipo" required>
              <option value="">Seleccione</option>
              <option value="Administrador">Administrador</option>
              <option value="Vendedor">Vendedor</option>
              <option value="Cliente">Cliente</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="usuario-direccion">Dirección</label>
            <input type="text" id="usuario-direccion" required />
          </div>
          <button type="submit">Guardar Usuario</button>
        </form>
      </section>

      {/* LISTADO DE USUARIOS */}
      <section className="admin-listado">
        <h2>Listado de Usuarios</h2>
        <table id="tabla-usuarios">
          <thead>
            <tr>
              <th>RUN</th>
              <th>Nombre</th>
              <th>Apellidos</th>
              <th>Correo</th>
              <th>Tipo</th>
              <th>Dirección</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {/* Aquí los usuarios se agregarán dinámicamente */}
          </tbody>
        </table>
      </section>
    </main>
  );
};

export default GestionUsuarios;
