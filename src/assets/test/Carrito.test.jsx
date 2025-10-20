import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Carrito from '../pages/Carrito';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';

describe('Página <Carrito />', () => {
  it('debería mostrar título y mensaje de carrito vacío', () => {
    render(
      <MemoryRouter>
        <Carrito carrito={[]} setCarrito={() => {}} />
      </MemoryRouter>
    );

    const titulo = screen.getByText(/Tu Carrito/i);
    expect(titulo).toBeInTheDocument();

    const mensajeVacio = screen.getByText(/No hay productos en el carrito/i);
    expect(mensajeVacio).toBeInTheDocument();
  });
});