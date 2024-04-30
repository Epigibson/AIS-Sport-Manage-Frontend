import { SideBarLayout } from "../components/layout/SideBarLayout.jsx";
import { MainContainerLayout } from "../components/layout/MainContainerLayout.jsx";
import { IndividualAthleteLogic } from "../logic/individualAthlete/IndividualAthleteLogic.jsx";

export const IndividualAthletePage = () => {
  return (
    <SideBarLayout>
      <MainContainerLayout title={"Atleta"}>
        <IndividualAthleteLogic />
      </MainContainerLayout>
    </SideBarLayout>
  );
};
