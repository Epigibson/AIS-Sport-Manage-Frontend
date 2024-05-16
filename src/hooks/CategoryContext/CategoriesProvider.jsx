import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "../../api/CategoryService.jsx";
import { LoaderIconUtils } from "../../utils/LoaderIconUtils.jsx";
import CategoriesContext from "./CategoryContext.jsx";
import PropTypes from "prop-types";

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

  if (isLoading) return <LoaderIconUtils isLoading={isLoading} />;
  if (isError) return <div>Error loading categories: {error?.message}</div>;

  return (
    <CategoriesContext.Provider value={{ categories }}>
      {children}
    </CategoriesContext.Provider>
  );
};

CategoriesProvider.propTypes = {
  children: PropTypes.node,
};
