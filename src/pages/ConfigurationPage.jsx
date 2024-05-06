import { MainContainerLayout } from "../components/layout/MainContainerLayout.jsx";
import { SideBarLayout } from "../components/layout/SideBarLayout.jsx";
import { ConfigurationLogic } from "../logic/configurations/ConfigurationLogic.jsx";

export const ConfigurationPage = () => {
  return (
    <SideBarLayout>
      <MainContainerLayout title={"Configuracion"}>
        <ConfigurationLogic />
      </MainContainerLayout>
    </SideBarLayout>
  );
};
