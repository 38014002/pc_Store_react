// src/tests/Inicio.test.jsx

import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest'; // <<< 'vi' importado aquí
import Inicio from '../pages/Inicio'; 

// VI.MOCK DEBE ESTAR AL INICIO DEL ARCHIVO


// Mock de Header: La sintaxis correcta (retornando 'default')
vi.mock('../components/Header', () => ({ 
    default: () => <header data-testid="mock-header">Mock Header</header> 
}));

// Mock de Footer
vi.mock('../components/Footer', () => ({ 
    default: () => <footer data-testid="mock-footer">Mock Footer</footer> 
}));
// ===============================================


describe('Pruebas de la Página <Inicio />', () => {
    // ... las pruebas aquí
    it ("deberia mostrar titulo", () =>{ 
        const {getByText} = render (<Inicio />)
        expect(getByText("Productos Destacados")).toBeTruthy( )
     } )
});