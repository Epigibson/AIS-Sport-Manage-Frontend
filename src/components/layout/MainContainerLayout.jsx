import { useAuth } from "../../hooks/AuthContext/useAuth.jsx";
import PropTypes from "prop-types";

export const MainContainerLayout = ({
  children,
  title,
  background,
  overflowY,
}) => {
  const { user } = useAuth();

  if (!user) {
    return <div>Cargando datos del usuario...</div>;
  }

  // console.log("DATA DE USUARIO EN EL MAIN", athletes);
  // console.log("DATA DE USUARIO EN EL MAIN", athletes);

  return (
    <div
      className={`min-h-dvh text-center text-xl  ${background || ""}`}
      style={{ overflowY: overflowY, height: "min-content" }}
    >
      {title}
      {children}
    </div>
  );
};

// Aquí es donde defines las validaciones para tus props
MainContainerLayout.propTypes = {
  children: PropTypes.node, // 'node' cubre cualquier cosa que pueda ser renderizada: números, strings, elementos o fragmentos
  title: PropTypes.string, // Definiendo que 'title' debería ser una string
  background: PropTypes.string, // Definiendo que 'background' debería ser una string
  overflowY: PropTypes.any, // Definiendo que 'overflow' debería ser una string
};
