import { MainContainerLayout } from "../components/layout/MainContainerLayout.jsx";
import { SideBarLayout } from "../components/layout/SideBarLayout.jsx";
import { GroupLogic } from "../logic/group/GroupLogic.jsx";

export const GroupsPage = () => {
  return (
    <SideBarLayout>
      <MainContainerLayout title={"Membresías"}>
        <GroupLogic />
      </MainContainerLayout>
    </SideBarLayout>
  );
};
