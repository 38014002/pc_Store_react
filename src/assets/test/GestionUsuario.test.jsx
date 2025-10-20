// @ts-nocheck
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import GestionUsuario from '../pages/GestionUsuario';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';

describe('Página <GestionUsuario />', () => {
  it('debería mostrar formulario y tabla de usuarios', () => {
    render(
      <MemoryRouter>
        <GestionUsuario />
      </MemoryRouter>
    );

    const tituloFormulario = screen.getByText(/Agregar Usuario/i);
    expect(tituloFormulario).toBeInTheDocument();

    const campoNombre = screen.getByLabelText(/Nombre/i);
    expect(campoNombre).toBeInTheDocument();

    const campoCorreo = screen.getByLabelText(/Correo/i);
    expect(campoCorreo).toBeInTheDocument();

    const tituloTabla = screen.getByText(/Listado de Usuarios/i);
    expect(tituloTabla).toBeInTheDocument();

    const botonGuardar = screen.getByText(/Guardar Usuario/i);
    expect(botonGuardar).toBeInTheDocument();
  });
});