import { apiClient } from "./index.jsx";

export const getAllPackages = async () => {
  try {
    const response = await apiClient.get("/products/");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createPackage = async (data) => {
  try {
    const response = await apiClient.post("/products/", data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updatePackage = async (id, data) => {
  try {
    const response = await apiClient.put(`/products/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
