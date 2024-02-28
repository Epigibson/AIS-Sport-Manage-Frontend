import { MainContainerLayout } from "../components/layout/MainContainerLayout.jsx";
import { SideBarLayout } from "../components/layout/SideBarLayout.jsx";
import { PackageLogic } from "../logic/packages/PakageLogic.jsx";

export const PackagesPage = () => {
  return (
    <SideBarLayout>
      <MainContainerLayout title={"Paquetes"}>
        <PackageLogic />
      </MainContainerLayout>
    </SideBarLayout>
  );
};
