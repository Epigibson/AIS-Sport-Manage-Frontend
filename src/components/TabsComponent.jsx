import { Tabs } from "antd";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

export const TabsComponent = ({ items, activeKey, setActiveKey }) => {
  const navigate = useNavigate();

  // Convertir la estructura de datos a lo que espera el componente Tabs de Ant Design
  const tabsItems = items?.map((item) => ({
    key: item.key,
    label: item.label,
    children: <item.component />, // Corregido para utilizar item.component
  }));

  const onChange = (key) => {
    if (setActiveKey) {
      setActiveKey(key);
      // Actualiza la URL sin recargar la página
      navigate(`/home?tab=${key}`, { replace: true });
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
      component: PropTypes.any.isRequired, // Usar elementType para componentes
    }),
  ).isRequired,
  activeKey: PropTypes.string,
  setActiveKey: PropTypes.func,
};
