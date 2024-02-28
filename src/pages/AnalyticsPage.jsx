import { MainContainerLayout } from "../components/layout/MainContainerLayout.jsx";
import { TablesComponent } from "../components/TablesComponent.jsx";
import { SideBarLayout } from "../components/layout/SideBarLayout.jsx";

export const AnalyticsPage = () => {
  return (
    <SideBarLayout>
      <MainContainerLayout title={"Analiticas"}>
        <TablesComponent />
      </MainContainerLayout>
    </SideBarLayout>
  );
};
