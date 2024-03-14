import { Tabs } from "antd";
import PropTypes from "prop-types";

export const TabsComponent = ({ items }) => {
  const onChange = (key) => {
    console.log("Tab cambiada a: ", key);
  };

  // Convertir la estructura de datos a lo que espera el componente Tabs de Ant Design
  const tabsItems = items?.map((item) => ({
    key: item.key,
    label: item.label,
    children: <item.component />, // Corregido para utilizar item.component
  }));

  return (
    <Tabs
      size={"small"}
      type="card"
      centered={true}
      addIcon={true}
      defaultActiveKey="1"
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
};
