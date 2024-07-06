import { MainContainerLayout } from "../components/layout/MainContainerLayout.jsx";
import { SideBarLayout } from "../components/layout/SideBarLayout.jsx";
import { WalletLogic } from "../logic/wallet/WalletLogic.jsx";

export const WalletPage = () => {
  return (
    <SideBarLayout>
      <MainContainerLayout title={"Wallet"}>
        <WalletLogic />
      </MainContainerLayout>
    </SideBarLayout>
  );
};
