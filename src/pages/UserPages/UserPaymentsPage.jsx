import { SideBarLayout } from "../../components/layout/SideBarLayout.jsx";
import { MainContainerLayout } from "../../components/layout/MainContainerLayout.jsx";
import { UserLoggedPaymentsLogic } from "../../logic/user/userPayments/UserLoggedPaymentsLogic.jsx";

export const UserPaymentsPage = () => {
  return (
    <SideBarLayout>
      <MainContainerLayout title={"Mis Pagos"}>
        <UserLoggedPaymentsLogic />
      </MainContainerLayout>
    </SideBarLayout>
  );
};
