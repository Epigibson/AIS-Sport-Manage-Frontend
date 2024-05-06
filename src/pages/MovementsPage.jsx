import { MainContainerLayout } from "../components/layout/MainContainerLayout.jsx";
import { SideBarLayout } from "../components/layout/SideBarLayout.jsx";
import { MovementsLogic } from "../logic/movements/MovementsLogic.jsx";

export const MovementsPage = () => {
  return (
    <SideBarLayout>
      <MainContainerLayout title={"Movimientos"}>
        <MovementsLogic />
      </MainContainerLayout>
    </SideBarLayout>
  );
};
