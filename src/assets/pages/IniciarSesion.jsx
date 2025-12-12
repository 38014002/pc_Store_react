import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/Auth'; // ⬅ Importante
import Button from "../components/Button";

const IniciarSesion = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      // 🔥 Llamada REAL al backend
      const usuario = await login(email, password);

      console.log("LOGIN ÉXITO →", usuario);

      // Redirección según rol
      if (usuario.tipo.toLowerCase() === "administrador") {
        navigate('/administrador');
      } else {
        navigate('/');
      }

    } catch (error) {
      console.error("ERROR LOGIN:", error);
      setErrorMsg("Correo o contraseña incorrectos");
    }
  };

  return (
    <main className="container">
      <section className="form-wrap">
        <h2>Iniciar Sesión</h2>

        {errorMsg && (
          <p style={{ color: "red", marginBottom: "1rem" }}>
            {errorMsg}
          </p>
        )}

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

          <Button type="submit">Iniciar sesión</Button>
        </form>
      </section>
    </main>
  );
};

export default IniciarSesion;
