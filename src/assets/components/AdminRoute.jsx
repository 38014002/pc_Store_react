// AdminRoute.jsx (Versión Correcta)

import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  // Asegúrate de usar los nombres CORRECTOS de localStorage: 'jwt_token' y 'user_info'
  const token = localStorage.getItem("jwt_token"); 
  const usuario = JSON.parse(localStorage.getItem("user_info") || "{}");

  if (!token) {
    return <Navigate to="/iniciar-sesion" replace />;
  }

  // CRÍTICO: Compara usando toLowerCase() para que coincida con "administrador" de la DB
  if (usuario.tipo && usuario.tipo.toLowerCase() !== "administrador") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;
