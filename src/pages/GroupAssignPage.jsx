import { GroupAssignLayout } from "../components/layout/GroupAssingLayout/GroupAssignLayout.jsx";
import { MainContainerLayout } from "../components/layout/MainContainerLayout.jsx";
import { SideBarLayout } from "../components/layout/SideBarLayout.jsx";

export const GroupAssignPage = () => {
  return (
    <SideBarLayout>
      <MainContainerLayout title={"Asignacion de Grupos"}>
        <GroupAssignLayout />;
      </MainContainerLayout>
    </SideBarLayout>
  );
};
