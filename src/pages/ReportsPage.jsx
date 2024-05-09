import { MainContainerLayout } from "../components/layout/MainContainerLayout.jsx";
import { SideBarLayout } from "../components/layout/SideBarLayout.jsx";
import { ReportsLogic } from "../logic/reports/ReportsLogic.jsx";

export const ReportsPage = () => {
  return (
    <SideBarLayout>
      <MainContainerLayout title={"Reportes"}>
        <ReportsLogic />
      </MainContainerLayout>
    </SideBarLayout>
  );
};
