import { useQuery } from "@tanstack/react-query";
import { getAllCouches, getAllUsers } from "../api/UserService.jsx";
import { getAllGroups } from "../api/GroupService.jsx";
import { getAllPackages } from "../api/ProductService.jsx";
import { getAllCategories } from "../api/CategoryService.jsx";
import { getAllAthletes } from "../api/AtheleService.jsx";
import { getAllSalesProducts } from "../api/ProductsService.jsx";

export const useFetchData = () => {
  const couchesQuery = useQuery({
    queryKey: ["couches"],
    queryFn: getAllCouches,
  });
  const usersQuery = useQuery({ queryKey: ["users"], queryFn: getAllUsers });
  const groupsQuery = useQuery({ queryKey: ["groups"], queryFn: getAllGroups });
  const packagesQuery = useQuery({
    queryKey: ["packages"],
    queryFn: getAllPackages,
  });
  const categoriesQuery = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });
  const athletesQuery = useQuery({
    queryKey: ["athletes"],
    queryFn: getAllAthletes,
  });
  const salesProductsQuery = useQuery({
    queryKey: ["salesProducts"],
    queryFn: getAllSalesProducts,
  });

  return {
    couches: couchesQuery.data || [],
    users: usersQuery.data || [],
    groups: groupsQuery.data || [],
    packages: packagesQuery.data || [],
    categories: categoriesQuery.data || [],
    athletes: athletesQuery.data || [],
    salesProducts: salesProductsQuery.data || [],
  };
};
