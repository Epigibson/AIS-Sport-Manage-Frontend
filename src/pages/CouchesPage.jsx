import { MainContainerLayout } from "../components/layout/MainContainerLayout.jsx";
import { SideBarLayout } from "../components/layout/SideBarLayout.jsx";
import { CouchLogic } from "../logic/couch/CouchLogic.jsx";

export const CouchesPage = () => {
  return (
    <SideBarLayout>
      <MainContainerLayout title={"Coaches"}>
        <CouchLogic />
      </MainContainerLayout>
    </SideBarLayout>
  );
};
