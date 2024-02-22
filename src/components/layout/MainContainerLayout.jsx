import { Tabs } from "antd";
import { TablesComponent } from "../TablesComponent.jsx";

export const MainContainerLayout = () => {
  const onChange = (key) => {
    console.log(key);
  };
  const items = [
    {
      key: "1",
      label: "Tab 1",
      children: <TablesComponent />,
    },
    {
      key: "2",
      label: "Tab 2",
      children: <TablesComponent />,
    },
    {
      key: "3",
      label: "Tab 3",
      children: <TablesComponent />,
    },
  ];
  return (
    <div className="p-4 sm:ml-72">
      <div className="text-center text-2xl font-bold mb-4">Dashboard</div>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </div>
  );
};
