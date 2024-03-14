import { SideBarLayout } from "../components/layout/SideBarLayout.jsx";
import { MainContainerLayout } from "../components/layout/MainContainerLayout.jsx";
import { InscriptionLayout } from "../logic/inscription/InscriptionLayout.jsx";

export const InscriptionPage = () => {
  return (
    <>
      <SideBarLayout>
        <MainContainerLayout title={"Registro"}>
          <InscriptionLayout />
        </MainContainerLayout>
      </SideBarLayout>
    </>
  );
};
