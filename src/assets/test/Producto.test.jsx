import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Producto from '../pages/Producto';
import { describe, it, expect } from 'vitest';

describe('Página <Producto />', () => {
  it('debería mostrar título y productos', () => {
    render(
      <MemoryRouter>
        <Producto carrito={[]} setCarrito={() => {}} />
      </MemoryRouter>
    );

    const titulo = screen.getByText(/Productos/i);
    expect(titulo).toBeInTheDocument();

    const buscador = screen.getByPlaceholderText(/Buscar producto/i);
    expect(buscador).toBeInTheDocument();

    const productos = screen.getAllByText(/Agregar al carrito/i);
    expect(productos.length).toBeGreaterThan(0);
  });
});