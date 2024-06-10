import { SideBarLayout } from "../../components/layout/SideBarLayout.jsx";
import { MainContainerLayout } from "../../components/layout/MainContainerLayout.jsx";
import { UserLoggedAthletesLogic } from "../../logic/user/userAthletes/UserLoggedAthletesLogic.jsx";

export const UserAthletesPage = () => {
  return (
    <SideBarLayout>
      <MainContainerLayout title={"Atletas Registrados"}>
        <UserLoggedAthletesLogic />
      </MainContainerLayout>
    </SideBarLayout>
  );
};
