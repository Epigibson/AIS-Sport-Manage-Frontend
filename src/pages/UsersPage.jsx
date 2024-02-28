import { MainContainerLayout } from "../components/layout/MainContainerLayout.jsx";
import { SideBarLayout } from "../components/layout/SideBarLayout.jsx";
import { UserLogic } from "../logic/UserLogic.jsx";

export const UsersPage = () => {
  return (
    <SideBarLayout>
      <MainContainerLayout title={"Usuarios"}>
        <UserLogic />
      </MainContainerLayout>
    </SideBarLayout>
  );
};
