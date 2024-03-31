import { MainContainerLayout } from "../components/layout/MainContainerLayout.jsx";
import { SideBarLayout } from "../components/layout/SideBarLayout.jsx";
import { GroupAssignLogic } from "../logic/groupAassign/GroupAssignLogic.jsx";

export const GroupAssignPage = () => {
  return (
    <SideBarLayout>
      <MainContainerLayout title={"Asignacion de Grupos"}>
        <GroupAssignLogic />
      </MainContainerLayout>
    </SideBarLayout>
  );
};
