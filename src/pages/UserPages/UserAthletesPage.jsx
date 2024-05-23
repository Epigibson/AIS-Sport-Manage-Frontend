import { SideBarLayout } from "../../components/layout/SideBarLayout.jsx";
import { MainContainerLayout } from "../../components/layout/MainContainerLayout.jsx";
import { UserAthletesLogic } from "../../logic/user/userAthletes/UserAthletesLogic.jsx";

export const UserAthletesPage = () => {
  return (
    <SideBarLayout>
      <MainContainerLayout title={"Atletas Registrados"}>
        <UserAthletesLogic />
      </MainContainerLayout>
    </SideBarLayout>
  );
};
