import { SideBarLayout } from "../components/layout/SideBarLayout.jsx";
import { MainContainerLayout } from "../components/layout/MainContainerLayout.jsx";
import { TabsComponent } from "../components/TabsComponent.jsx";

export const HomePage = () => {
  return (
    <>
      <SideBarLayout>
        <MainContainerLayout title={"Dashboard"}>
          <TabsComponent />
        </MainContainerLayout>
      </SideBarLayout>
    </>
  );
};
