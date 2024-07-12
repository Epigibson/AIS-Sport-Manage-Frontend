import { SideBarLayout } from "../components/layout/SideBarLayout.jsx";
import { MainContainerLayout } from "../components/layout/MainContainerLayout.jsx";
import { ResumePaymentsLogic } from "../logic/resume_payments/ResumePaymentsLogic.jsx";
import { ActualMonthCalculation } from "../utils/ActualMonthCalculation.jsx";

export const HomePage = () => {
  return (
    <>
      <SideBarLayout>
        <MainContainerLayout
          title={`Resumen del mes actual: ${ActualMonthCalculation()}`}
        >
          <ResumePaymentsLogic />
        </MainContainerLayout>
      </SideBarLayout>
    </>
  );
};
