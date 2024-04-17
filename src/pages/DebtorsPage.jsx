import { MainContainerLayout } from "../components/layout/MainContainerLayout.jsx";
import { DebtorsLogic } from "../logic/debtors/DebtorsLogic.jsx";
import { Image } from "antd";
import banner from "/src/assets/banner.jpg";

export const DebtorsPage = () => {
  return (
    // <SideBarLayout>
    <MainContainerLayout background={"bg-black text-white overflow-hidden"}>
      <Image
        src={banner}
        preview={false}
        width={"50%"}
        style={{ objectFit: "cover" }}
        alt={"banner"}
        className={"mb-40"}
      />
      <DebtorsLogic />
    </MainContainerLayout>
    // </SideBarLayout>
  );
};
