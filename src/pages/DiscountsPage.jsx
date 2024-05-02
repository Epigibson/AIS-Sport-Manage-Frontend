import { MainContainerLayout } from "../components/layout/MainContainerLayout.jsx";
import { SideBarLayout } from "../components/layout/SideBarLayout.jsx";
import { DiscountsLogic } from "../logic/discounts/DiscountsLogic.jsx";

export const DiscountsPage = () => {
  return (
    <SideBarLayout>
      <MainContainerLayout title={"Descuentos"}>
        <DiscountsLogic />
      </MainContainerLayout>
    </SideBarLayout>
  );
};
