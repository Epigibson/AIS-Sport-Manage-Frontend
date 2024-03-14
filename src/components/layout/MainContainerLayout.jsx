import { useAuth } from "../../hooks/AuthContext/useAuth.jsx";
import PropTypes from "prop-types";

export const MainContainerLayout = ({ children, title }) => {
  const { user } = useAuth();

  if (!user) {
    return <div>Cargando datos del usuario...</div>;
  }

  // console.log("DATA DE USUARIO EN EL MAIN", user);
  // console.log("DATA DE USUARIO EN EL MAIN", user);

  return (
    <>
      <div className="text-center text-xl font-bold mb-5 ">{title}</div>
      {children}
    </>
  );
};

// Aquí es donde defines las validaciones para tus props
MainContainerLayout.propTypes = {
  children: PropTypes.node, // 'node' cubre cualquier cosa que pueda ser renderizada: números, strings, elementos o fragmentos
  title: PropTypes.string, // Definiendo que 'title' debería ser una string
};
