import { SideBarLayout } from "../../components/layout/SideBarLayout.jsx";
import { MainContainerLayout } from "../../components/layout/MainContainerLayout.jsx";
import { UserProfileLogic } from "../../logic/user/userProfile/UserProfileLogic.jsx";

export const UserProfilePage = () => {
  return (
    <SideBarLayout>
      <MainContainerLayout title={"Mi Informacion"}>
        <UserProfileLogic />
      </MainContainerLayout>
    </SideBarLayout>
  );
};
