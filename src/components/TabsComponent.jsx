import { Tabs } from "antd";
import { InscriptionLayout } from "./layout/InscriptionLayout.jsx";
import { GroupAssignLayout } from "./layout/GroupAssingLayout/GroupAssignLayout.jsx";
import { UsersInscribedLayout } from "./layout/UsersInscribedLayout/UsersInscribedLayout.jsx";

export const TabsComponent = () => {
  const onChange = (key) => {
    console.log(key);
  };
  const items = [
    {
      key: "1",
      label: "Inscripciones",
      children: <InscriptionLayout />,
    },
    {
      key: "2",
      label: "Resumen",
      children: <UsersInscribedLayout />,
    },
    {
      key: "3",
      label: "Asignacion de Grupos",
      children: <GroupAssignLayout />,
    },
  ];

  return <Tabs defaultActiveKey="1" items={items} onChange={onChange} />;
};
