import { SideBarLayout } from "../../components/layout/SideBarLayout.jsx";
import { MainContainerLayout } from "../../components/layout/MainContainerLayout.jsx";
import { UserPaymentsLogic } from "../../logic/user/userPayments/UserPaymentsLogic.jsx";

export const UserPaymentsPage = () => {
  return (
    <SideBarLayout>
      <MainContainerLayout title={"Mis Pagos"}>
        <UserPaymentsLogic />
      </MainContainerLayout>
    </SideBarLayout>
  );
};
