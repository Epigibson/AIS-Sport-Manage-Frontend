import { SideBarLayout } from "../components/layout/SideBarLayout.jsx";
import { MainContainerLayout } from "../components/layout/MainContainerLayout.jsx";
import { ResumePaymentsLogic } from "../logic/resume_payments/ResumePaymentsLogic.jsx";

export const HomePage = () => {
  // const usuario = useAuth();
  // console.log(usuario);
  return (
    <>
      <SideBarLayout>
        <MainContainerLayout title={"Dashboard"}>
          <ResumePaymentsLogic />
        </MainContainerLayout>
      </SideBarLayout>
    </>
  );
};
