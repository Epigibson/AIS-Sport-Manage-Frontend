import { apiClient } from "./index.jsx";

export const getAllCategories = async () => {
  try {
    const response = await apiClient.get("/categories/");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
