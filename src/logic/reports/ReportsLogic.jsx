import { Card } from "antd";
import { TabsComponent } from "../../components/TabsComponent.jsx";
import { ReportsTabItems } from "./ReportsTabItems.jsx";
import { useLocation } from "react-router-dom";
import { useState } from "react";

export const ReportsLogic = () => {
  const location = useLocation();
  let queryParams;
  queryParams = new URLSearchParams(location.search);
  const [activeTab, setActiveTab] = useState(queryParams.get("tab") || "1");

  return (
    <Card>
      <TabsComponent
        items={ReportsTabItems}
        activeKey={activeTab}
        setActiveKey={setActiveTab}
        baseRoute="/reportes"
      />
    </Card>
  );
};
