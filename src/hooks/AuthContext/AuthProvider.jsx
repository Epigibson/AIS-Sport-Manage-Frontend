import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../api/AuthService.jsx";
import { saveTokens } from "../../utils/tokenUtils.jsx";
import { GetUserLoggedIn } from "../../utils/getUserUtils.jsx";
import AuthContext from "./AuthContext.jsx"; // Importa AuthContext correctamente
import PropTypes from "prop-types";
import { toastNotify } from "../../utils/ToastNotify.jsx";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const navigate = useNavigate(); // Importar useNavigate de react-router-dom
  const [isLoading, setIsLoading] = useState(false); // Estado para controlar el cargando de la página

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: () => {
      navigate("/home");
    },
    onError: (error) => {
      console.error(error);
    },
  });

  // La función para iniciar sesión que será expuesta a los componentes
  const loginHandler = async (username, password) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("password", password);

      const data = await loginMutation.mutateAsync(formData);
      saveTokens(data);

      const userData = await GetUserLoggedIn();
      setUser(userData);
      console.log("Usuario autenticado:", user);
      setIsLoading(false); // Desactiva el estado de carga si el login es exitoso
      toastNotify({
        type: "success",
        message: `Bienvenid@ de nuevo!.`,
        description: "Sesión iniciada correctamente.",
      });
    } catch (error) {
      toastNotify({
        type: "error",
        message: "Error al iniciar sesión.",
        description: "Correo o contraseña incorrectos.",
      });
      console.error(error);
      setIsLoading(false); // Desactiva el estado de carga si el login es exitoso
      // console.error("Error al iniciar sesion.", error);
    }
  };

  // Objeto de valor para el contexto
  const value = { user, loginHandler, isLoading };

  // AuthContext.jsx
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
