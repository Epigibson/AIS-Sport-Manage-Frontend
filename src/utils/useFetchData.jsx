import { useQuery } from "@tanstack/react-query";
import { getAllCouches } from "../api/UserService.jsx";
import { getAllGroups } from "../api/GroupService.jsx";
import { getAllPackages } from "../api/ProductService.jsx";
import { getAllCategories } from "../api/CategoryService.jsx";
import { getAllAthletes } from "../api/AtheleService.jsx";
import { getAllSalesProducts } from "../api/ProductsService.jsx";
import { useMemo } from "react";
import { useUsers } from "../hooks/UserContext/useUsers.jsx";

export const useFetchData = () => {
  const couchesQuery = useQuery({
    queryKey: ["couches"],
    queryFn: getAllCouches,
  });
  const { users } = useUsers();
  const usersQuery = users;
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

  const data = useMemo(
    () => ({
      couches: couchesQuery.data || [],
      users: usersQuery || [],
      groups: groupsQuery.data || [],
      packages: packagesQuery.data || [],
      categories: categoriesQuery.data || [],
      athletes: athletesQuery.data || [],
      salesProducts: salesProductsQuery.data || [],
    }),
    [
      couchesQuery.data,
      usersQuery.data,
      groupsQuery.data,
      packagesQuery.data,
      categoriesQuery.data,
      athletesQuery.data,
      salesProductsQuery.data,
    ],
  );

  const isLoading = useMemo(
    () =>
      couchesQuery.isLoading ||
      usersQuery.isLoading ||
      groupsQuery.isLoading ||
      packagesQuery.isLoading ||
      categoriesQuery.isLoading ||
      athletesQuery.isLoading ||
      salesProductsQuery.isLoading,
    [
      couchesQuery.isLoading,
      usersQuery.isLoading,
      groupsQuery.isLoading,
      packagesQuery.isLoading,
      categoriesQuery.isLoading,
      athletesQuery.isLoading,
      salesProductsQuery.isLoading,
    ],
  );

  const isError = useMemo(
    () =>
      couchesQuery.isError ||
      usersQuery.isError ||
      groupsQuery.isError ||
      packagesQuery.isError ||
      categoriesQuery.isError ||
      athletesQuery.isError ||
      salesProductsQuery.isError,
    [
      couchesQuery.isError,
      usersQuery.isError,
      groupsQuery.isError,
      packagesQuery.isError,
      categoriesQuery.isError,
      athletesQuery.isError,
      salesProductsQuery.isError,
    ],
  );

  return { data, isLoading, isError };
};
