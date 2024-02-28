import { useAuth } from "../../hooks/AuthContext.jsx";

export const MainContainerLayout = ({ children, title }) => {
  const { user } = useAuth();

  if (!user) {
    return <div>Cargando datos del usuario...</div>;
  }

  console.log("DATA DE USUARIO EN EL MAIN", user);

  return (
    <>
      <div className="text-center text-2xl font-bold mb-4">{title}</div>
      {children}
    </>
  );
};
