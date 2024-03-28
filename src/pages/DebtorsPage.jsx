import { MainContainerLayout } from "../components/layout/MainContainerLayout.jsx";
import { DebtorsLogic } from "../logic/debtors/DebtorsLogic.jsx";

export const DebtorsPage = () => {
  return (
    // <SideBarLayout>
    <MainContainerLayout
      title={"Adeudos"}
      background={"bg-black text-white overflow-hidden"}
    >
      <DebtorsLogic />
    </MainContainerLayout>
    // </SideBarLayout>
  );
};
