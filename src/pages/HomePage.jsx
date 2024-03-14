import { SideBarLayout } from "../components/layout/SideBarLayout.jsx";
import { MainContainerLayout } from "../components/layout/MainContainerLayout.jsx";
import { HomeLogic } from "../logic/home/HomeLogic.jsx";

export const HomePage = () => {
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
