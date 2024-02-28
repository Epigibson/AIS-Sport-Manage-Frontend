import { SideBarLayout } from "../components/layout/SideBarLayout.jsx";
import { MainContainerLayout } from "../components/layout/MainContainerLayout.jsx";
import { InscriptionLayout } from "../components/layout/InscriptionLayout.jsx";

export const InscriptionPage = () => {
  return (
    <>
      <SideBarLayout>
        <MainContainerLayout title={"Inscripciones"}>
          <InscriptionLayout />
        </MainContainerLayout>
      </SideBarLayout>
    </>
  );
};
