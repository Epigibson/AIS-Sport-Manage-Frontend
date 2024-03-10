import { useContext } from "react";
import CategoriesContext from "./CategoryContext.jsx";

export const useCategories = () => {
  useContext(CategoriesContext);
  return useContext(CategoriesContext);
};
