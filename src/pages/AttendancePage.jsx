import { MainContainerLayout } from "../components/layout/MainContainerLayout.jsx";
import { SideBarLayout } from "../components/layout/SideBarLayout.jsx";
import { AttendanceListLogic } from "../logic/attendenceList/AttendanceListLogic.jsx";

export const AttendancePage = () => {
  return (
    <SideBarLayout>
      <MainContainerLayout title={"Pase de Lista"}>
        <AttendanceListLogic />
      </MainContainerLayout>
    </SideBarLayout>
  );
};
