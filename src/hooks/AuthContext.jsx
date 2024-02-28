import { createContext, useContext, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { login } from "../api/AuthService.jsx";
import { saveTokens } from "../utils/tokenUtils.jsx";
import PropTypes from "prop-types";
import { GetUserLoggedIn } from "../utils/getUserUtils.jsx";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const navigate = useNavigate(); // Importar useNavigate de react-router-dom

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: () => {
      navigate("/home");
    },
    onError: (error) => {
      console.error("Error al iniciar sesión", error);
    },
  });

  // La función para iniciar sesión que será expuesta a los componentes
  const loginHandler = async (username, password) => {
    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("password", password);

      const data = await loginMutation.mutateAsync(formData);
      saveTokens(data);

      const userData = await GetUserLoggedIn();
      setUser(userData);
      console.log("Usuario autenticado:", user);
    } catch (error) {
      console.error("Error al iniciar sesion.", error);
    }
  };

  // Objeto de valor para el contexto
  const value = { user, loginHandler };

  // AuthContext.jsx
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Hook personalizado para usar el contexto de autenticación
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
