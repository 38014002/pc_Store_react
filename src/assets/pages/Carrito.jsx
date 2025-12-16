import React from "react";
import { useNavigate } from "react-router-dom";

const Carrito = ({ carrito, setCarrito }) => {
  const navigate = useNavigate();
  const total = carrito.reduce((acc, item) => acc + item.precio, 0);

  const eliminarProducto = (codigo) => {
    const nuevoCarrito = carrito.filter(item => item.codigo !== codigo);
    setCarrito(nuevoCarrito);
  };

  const handlePagar = () => {
    if (carrito.length > 0) {
      alert(`Procediendo al pago por $${total.toLocaleString()}. \n()`);

    } else {
      alert("El carrito está vacío.");
    }
  };

  return (
    <main className="container">
      <h1>Tu Carrito</h1>
      {carrito.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <>
          {carrito.map(producto => (
            <div key={producto.codigo} className="item-carrito">
              <img src={producto.imagen} alt={producto.nombre} width={100} />
              <div>
                <p>{producto.nombre}</p>
                <p>Precio: ${producto.precio.toLocaleString()}</p>
              </div>
              <button onClick={() => eliminarProducto(producto.codigo)}>Eliminar</button>
            </div>
          ))}
          <h2>Total: ${total.toLocaleString()}</h2>
          <button onClick={() => navigate("/producto")}>← Seguir comprando</button>

          {/* --- BOTÓN AÑADIDO --- */}
          <button 
            onClick={handlePagar} 
            style={{ marginLeft: '10px', backgroundColor: '#28a745', color: 'white' }}
          >
            Pagar
          </button>
        </>
      )}
    </main>
  );
};

export default Carrito;