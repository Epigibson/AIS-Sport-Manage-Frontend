import { SideBarLayout } from "../components/layout/SideBarLayout.jsx";
import { MainContainerLayout } from "../components/layout/MainContainerLayout.jsx";
import { HomeLogic } from "../logic/home/HomeLogic.jsx";
import { useAuth } from "../hooks/AuthContext/useAuth.jsx";

export const HomePage = () => {
  const usuario = useAuth();
  console.log(usuario);
  return (
    <>
      <SideBarLayout>
        <MainContainerLayout title={"Dashboard"}>
          <HomeLogic />
        </MainContainerLayout>
      </SideBarLayout>
    </>
  );
};
