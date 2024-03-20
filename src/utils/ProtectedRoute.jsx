import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/AuthContext/useAuth.jsx";

export const ProtectedRoute = ({ children }) => {
  // Verifica si el token de acceso existe
  const data = useAuth();

  // Si no hay token, redirige al usuario a la página de inicio de sesión
  if (!data.user) {
    return <Navigate to="/" />;
  }

  // Si hay token, muestra el componente solicitado
  return children ? children : <Outlet />;
};
