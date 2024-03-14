import { TabsComponent } from "../../components/TabsComponent.jsx";
import { homeTabItems } from "./HomeTabs.jsx";

export const HomeLogic = () => {
  return <TabsComponent items={homeTabItems} />;
};
