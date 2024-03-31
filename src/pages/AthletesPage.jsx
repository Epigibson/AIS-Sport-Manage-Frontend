import { MainContainerLayout } from "../components/layout/MainContainerLayout.jsx";
import { SideBarLayout } from "../components/layout/SideBarLayout.jsx";
import { AthleteLogic } from "../logic/athletes/AthleteLogic.jsx";

export const AthletesPage = () => {
  return (
    <SideBarLayout>
      <MainContainerLayout title={"Atletas"}>
        <AthleteLogic />
      </MainContainerLayout>
    </SideBarLayout>
  );
};
