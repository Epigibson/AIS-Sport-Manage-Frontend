import { MainContainerLayout } from "../components/layout/MainContainerLayout.jsx";
import { SideBarLayout } from "../components/layout/SideBarLayout.jsx";

export const PaymentsPage = () => {
  return (
    <SideBarLayout>
      <MainContainerLayout title={"Pagos"}></MainContainerLayout>
    </SideBarLayout>
  );
};
