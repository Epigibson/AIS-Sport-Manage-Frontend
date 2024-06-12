import { MainContainerLayout } from "../components/layout/MainContainerLayout.jsx";
import { SideBarLayout } from "../components/layout/SideBarLayout.jsx";
import { UserListLogic } from "../logic/userList/UserListLogic.jsx";

export const UserListPage = () => {
  return (
    <SideBarLayout>
      <MainContainerLayout title={"Usuarios"}>
        <UserListLogic />
      </MainContainerLayout>
    </SideBarLayout>
  );
};
