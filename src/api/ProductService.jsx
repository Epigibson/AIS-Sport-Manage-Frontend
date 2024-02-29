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

export const updatePackage = async (data) => {
  const { product_id, ...updateData } = data; // Extrae product_id y guarda el resto en updateData
  try {
    const response = await apiClient.put(`/products/${product_id}`, updateData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deletePackage = async (id) => {
  try {
    const response = await apiClient.delete(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }

};
