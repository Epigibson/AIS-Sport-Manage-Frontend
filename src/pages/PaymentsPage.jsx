import { MainContainerLayout } from "../components/layout/MainContainerLayout.jsx";
import { SideBarLayout } from "../components/layout/SideBarLayout.jsx";
import { PaymentLogic } from "../logic/payments/PaymentLogic.jsx";
import "../logic/payments/PaymentsStyle.css";

export const PaymentsPage = () => {
  return (
    <SideBarLayout>
      <MainContainerLayout title={"Pagos"}>
        <PaymentLogic />
      </MainContainerLayout>
    </SideBarLayout>
  );
};
