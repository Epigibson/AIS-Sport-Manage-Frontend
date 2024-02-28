import { TablesComponent } from "../components/TablesComponent.jsx";
import { useQuery } from "@tanstack/react-query";
import { getAllPackages } from "../api/ProductService.jsx";
import { PackagesColumns } from "./ProductColumns.jsx";

export const PackageLogic = () => {
  const {
    data: packagesData,
    isLoading,
    isError,
  } = useQuery({ queryKey: ["allPackages"], queryFn: getAllPackages });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  return <TablesComponent data={packagesData} columns={PackagesColumns} />;
};
