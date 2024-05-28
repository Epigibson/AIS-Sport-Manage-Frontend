import { MainContainerLayout } from "../components/layout/MainContainerLayout.jsx";
import { SideBarLayout } from "../components/layout/SideBarLayout.jsx";
import { ProductsLogic } from "../logic/products/ProductsLogic.jsx";

export const ProductsPage = () => {
  return (
    <SideBarLayout>
      <MainContainerLayout title={"Productos"}>
        <ProductsLogic />
      </MainContainerLayout>
    </SideBarLayout>
  );
};
