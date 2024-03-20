import { TabsComponent } from "../../components/TabsComponent.jsx";
import { homeTabItems } from "./HomeTabs.jsx";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export const HomeLogic = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [activeTab, setActiveTab] = useState(queryParams.get("tab") || "1");

  useEffect(() => {
    const tab = queryParams.get("tab");
    if (tab) setActiveTab(tab);
  }, [location, queryParams]);

  return (
    <TabsComponent
      items={homeTabItems}
      activeKey={activeTab}
      setActiveKey={setActiveTab}
    />
  );
};
