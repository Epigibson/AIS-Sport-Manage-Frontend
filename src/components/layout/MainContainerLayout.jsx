import { useAuth } from "../../hooks/AuthContext/useAuth.jsx";
import PropTypes from "prop-types";

export const MainContainerLayout = ({ children, title, background }) => {
  const { user } = useAuth();

  if (!user) {
    return <div>Cargando datos del usuario...</div>;
  }

  // console.log("DATA DE USUARIO EN EL MAIN", user);
  // console.log("DATA DE USUARIO EN EL MAIN", user);

  return (
    <>
      <div className={`h-svh text-center text-xl  ${background || ""}`}>
        {title}
        {children}
      </div>
    </>
  );
};

// Aquí es donde defines las validaciones para tus props
MainContainerLayout.propTypes = {
  children: PropTypes.node, // 'node' cubre cualquier cosa que pueda ser renderizada: números, strings, elementos o fragmentos
  title: PropTypes.string, // Definiendo que 'title' debería ser una string
  background: PropTypes.string, // Definiendo que 'background' debería ser una string
};
