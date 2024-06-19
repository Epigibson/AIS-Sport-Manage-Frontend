import { MainContainerLayout } from "../components/layout/MainContainerLayout.jsx";
import { SideBarLayout } from "../components/layout/SideBarLayout.jsx";
import { HistoryBalanceLogic } from "../logic/historyBalance/HistoryBalanceLogic.jsx";

export const HistoryBalancePage = () => {
  return (
    <SideBarLayout>
      <MainContainerLayout title={"Historial de Pagos con Saldo"}>
        <HistoryBalanceLogic />
      </MainContainerLayout>
    </SideBarLayout>
  );
};
