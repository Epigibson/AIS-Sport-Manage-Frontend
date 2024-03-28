import { MainContainerLayout } from "../components/layout/MainContainerLayout.jsx";
import { DebtorsLogic } from "../logic/debtors/DebtorsLogic.jsx";
import { Image } from "antd";
import banner from "../assets/banner.jpg";

export const DebtorsPage = () => {
  return (
    // <SideBarLayout>
    <MainContainerLayout
      title={"Listado de Pagos"}
      background={"bg-black text-white overflow-hidden"}
    >
      <Image
        src={banner}
        preview={false}
        width={"50%"}
        height={"40%"}
        className={"mb-0 p-0"}
        style={{ objectFit: "cover" }}
        alt={"banner"}
      />
      <DebtorsLogic />
    </MainContainerLayout>
    // </SideBarLayout>
  );
};
