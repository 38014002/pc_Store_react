import { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './assets/components/header';
import Footer from './assets/components/Footer';

// Protección de rutas
import ProtectedRoute from './assets/components/ProtectedRoute';
import AdminRoute from './assets/components/AdminRoute';

// Páginas
import Inicio from './assets/pages/Inicio';
import Producto from './assets/pages/Producto';
import Carrito from './assets/pages/Carrito';
import Contacto from './assets/pages/Contacto';
import Nosotros from './assets/pages/Nosotros';
import Registro from './assets/pages/Registro';
import IniciarSesion from './assets/pages/IniciarSesion';
import GestionUsuario from './assets/pages/GestionUsuario';
import GestionProducto from './assets/pages/GestionProducto';
import Administrador from './assets/pages/Administrador';

function App() {
  const [carrito, setCarrito] = useState(() => {
    return JSON.parse(localStorage.getItem("carrito")) || [];
  });

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  return (
    <>
      <BrowserRouter>
        <Header carrito={carrito} />

        <Routes>
          {/* Rutas públicas */}
          <Route index element={<Inicio />} />
          <Route path="producto" element={<Producto carrito={carrito} setCarrito={setCarrito} />} />
          <Route path="carrito" element={<Carrito carrito={carrito} setCarrito={setCarrito} />} />
          <Route path="contacto" element={<Contacto />} />
          <Route path="nosotros" element={<Nosotros />} />
          <Route path="registro" element={<Registro />} />
          <Route path="iniciar-sesion" element={<IniciarSesion />} />

          {/* Rutas para usuarios logueados */}

          <Route
            path="gestion-usuario"
            element={
              <AdminRoute> // 
                <GestionUsuario />
              </AdminRoute> // <-- Etiqueta de cierre
            }
          />

          {/* Rutas exclusivas del administrador */}
          <Route
            path="gestion-producto"
            element={
              <AdminRoute>
                <GestionProducto />
              </AdminRoute>
            }
          />

          <Route
            path="administrador"
            element={
              <AdminRoute>
                <Administrador />
              </AdminRoute>
            }
          />
        </Routes>
      </BrowserRouter>

      <Footer />
    </>
  );
}

export default App;
