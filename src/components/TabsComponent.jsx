import { Tabs } from "antd";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const TabsComponent = ({
  items,
  activeKey,
  setActiveKey,
  baseRoute = "",
  queryParam = "tabs",
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlTabKey = params.get(queryParam);
    if (urlTabKey && urlTabKey !== activeKey) {
      setActiveKey(urlTabKey);
    }
  }, [activeKey, setActiveKey, queryParam]);

  // Convertir la estructura de datos a lo que espera el componente Tabs de Ant Design
  const tabsItems = items?.map((item) => ({
    key: item.key,
    label: item.label,
    children: <item.component {...item.props} />,
  }));

  const onChange = (key) => {
    if (setActiveKey) {
      setActiveKey(key);
      // Actualiza la URL sin recargar la página
      navigate(`${baseRoute}?${queryParam}=${key}`, { replace: true });
    }
    console.log("Tab cambiada a: ", key);
  };

  return (
    <Tabs
      activeKey={activeKey}
      size={"small"}
      type="card"
      centered={true}
      addIcon={true}
      items={tabsItems}
      onChange={onChange}
    />
  );
};

TabsComponent.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      component: PropTypes.elementType.isRequired, // Usar elementType para componentes
      props: PropTypes.object, // Objeto de props para cada componente
    }),
  ).isRequired,
  activeKey: PropTypes.string,
  setActiveKey: PropTypes.func,
  baseRoute: PropTypes.string, // Base de la ruta para la navegación
  queryParam: PropTypes.string, // Nombre del parámetro de consulta para controlar la pestaña activa
};
