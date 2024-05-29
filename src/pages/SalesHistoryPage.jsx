import { MainContainerLayout } from "../components/layout/MainContainerLayout.jsx";
import { SideBarLayout } from "../components/layout/SideBarLayout.jsx";
import { SalesHistoryLogic } from "../logic/salesHistory/SalesHistoryLogic.jsx";

export const SalesHistoryPage = () => {
  return (
    <SideBarLayout>
      <MainContainerLayout title={"Ventas Indirectas"}>
        <SalesHistoryLogic />
      </MainContainerLayout>
    </SideBarLayout>
  );
};
