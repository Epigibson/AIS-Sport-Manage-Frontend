import { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "../api/CategoryService.jsx";

const CategoriesContext = createContext();

export const CategoriesProvider = ({ children }) => {
  const {
    data: categories,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });

  if (isLoading) return <div>Loading categories...</div>;
  if (isError) return <div>Error loading categories: {error.message}</div>;

  return (
    <CategoriesContext.Provider value={{ categories }}>
      {children}
    </CategoriesContext.Provider>
  );
};

export const useCategories = () => useContext(CategoriesContext);
