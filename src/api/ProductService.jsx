import { apiClient } from "./index.jsx";

export const getAllPackages = async () => {
  try {
    const response = await apiClient.get("/products/");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
