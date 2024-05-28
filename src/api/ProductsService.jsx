import { apiClient } from "./index.jsx";

export const getAllSalesProducts = async () => {
  try {
    const response = await apiClient.get("/sales_products/");
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.detail || "Un error desconocido ha ocurrido";
    throw new Error(errorMessage);
  }
};

export const createSalesProduct = async (data) => {
  try {
    const response = await apiClient.post("/sales_products/", data);
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.detail || "Un error desconocido ha ocurrido";
    throw new Error(errorMessage);
  }
};

export const updateSalesProduct = async (data) => {
  const { sales_product_id, ...updateData } = data; // Extrae product_id y guarda el resto en updateData
  try {
    const response = await apiClient.put(
      `/sales_products/${sales_product_id}`,
      updateData,
    );
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.detail || "Un error desconocido ha ocurrido";
    throw new Error(errorMessage);
  }
};

export const deleteSalesProduct = async (sales_product_id) => {
  try {
    const response = await apiClient.delete(
      `/sales_products/${sales_product_id}`,
    );
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.detail || "Un error desconocido ha ocurrido";
    throw new Error(errorMessage);
  }
};
