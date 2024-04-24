import { MainContainerLayout } from "../components/layout/MainContainerLayout.jsx";
import { SideBarLayout } from "../components/layout/SideBarLayout.jsx";
import { PaymentLogic } from "../logic/payments/PaymentLogic.jsx";
import "../logic/payments/PaymentsStyle.css";

export const PaymentsPage = () => {
  return (
    <SideBarLayout title={"Control de Pagos"}>
      <MainContainerLayout overflowY={"hidden"}>
        <PaymentLogic />
      </MainContainerLayout>
    </SideBarLayout>
  );
};
