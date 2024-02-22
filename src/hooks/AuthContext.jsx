import { createContext, useContext, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { login } from "../api/AuthService.jsx";
import { saveTokens } from "../utils/tokenUtils.jsx";
import PropTypes from "prop-types";
import { GetUserLoggedIn } from "../utils/getUserUtils.jsx";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      saveTokens(data);
      GetUserLoggedIn();
      const userData = localStorage.getItem("userData");
      const parsedUserData = JSON.parse(userData);
      console.log(parsedUserData); // Imprimir datos del usuario en la consola
      setUser(parsedUserData); // Establecer datos del usuario en el estado
    },
    onError: (error) => {
      console.error("Error al iniciar sesión", error);
    },
  });

  // La función para iniciar sesión que será expuesta a los componentes
  const loginHandler = (username, password) => {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    loginMutation.mutate(formData);
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
