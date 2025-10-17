// src/components/Newsletter.jsx
import React, { useState } from 'react';

const Newsletter = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`¡Gracias por suscribirte! Recibirás novedades en ${email}`);
    setEmail('');
  };

  return (
    <section className="bg-blue-600 py-16 text-white text-center px-4">
      <h2 className="text-3xl font-semibold mb-4">Suscríbete a nuestras ofertas</h2>
      <p className="text-lg mb-6">
        Recibe las mejores promociones y novedades directamente en tu correo.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row justify-center items-center max-w-md mx-auto">
        <input
          type="email"
          placeholder="Tu correo electrónico"
          className="p-3 rounded-l-lg text-black w-full sm:flex-1 mb-4 sm:mb-0"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" className="bg-white text-blue-600 p-3 rounded-r-lg font-semibold w-full sm:w-auto">
          Suscribirse
        </button>
      </form>
    </section>
  );
};

export default Newsletter;
