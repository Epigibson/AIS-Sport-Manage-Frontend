import { Tabs } from "antd";
import { TablesComponent } from "./TablesComponent.jsx";
import { InscriptionLayout } from "./layout/InscriptionLayout.jsx";
import { GroupAssignLayout } from "./layout/GroupAssignLayout.jsx";

export const TabsComponent = () => {
  const onChange = (key) => {
    console.log(key);
  };
  const items = [
    {
      key: "1",
      label: "Resumen",
      children: <TablesComponent />,
    },
    {
      key: "2",
      label: "Inscripciones",
      children: <InscriptionLayout />,
    },
    {
      key: "3",
      label: "Asignacion de Grupos",
      children: <GroupAssignLayout />,
    },
  ];

  return <Tabs defaultActiveKey="1" items={items} onChange={onChange} />;
};
