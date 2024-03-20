import { MainContainerLayout } from "../components/layout/MainContainerLayout.jsx";
import { SideBarLayout } from "../components/layout/SideBarLayout.jsx";
import { DebtorsLogic } from "../logic/debtors/DebtorsLogic.jsx";

export const DebtorsPage = () => {
  return (
    <SideBarLayout>
      <MainContainerLayout title={"Adeudos"}>
        <DebtorsLogic />
      </MainContainerLayout>
    </SideBarLayout>
  );
};
