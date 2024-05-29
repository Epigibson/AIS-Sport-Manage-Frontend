import { apiClient } from "./index.jsx";

export const getAllSalesHistory = async () => {
  try {
    const response = await apiClient.get("/sales_history/");
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.detail || "Un error desconocido ha ocurrido";
    throw new Error(errorMessage);
  }
};

export const createSalesHistory = async (data) => {
  try {
    const response = await apiClient.post("/sales_history/", data);
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.detail || "Un error desconocido ha ocurrido";
    throw new Error(errorMessage);
  }
};

export const updateSalesHistory = async (data) => {
  const { sales_history_id, ...updateData } = data; // Extrae product_id y guarda el resto en updateData
  try {
    const response = await apiClient.put(
      `/sales_history/${sales_history_id}`,
      updateData,
    );
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.detail || "Un error desconocido ha ocurrido";
    throw new Error(errorMessage);
  }
};

export const deleteSalesHistory = async (sales_history_id) => {
  try {
    const response = await apiClient.delete(
      `/sales_history/${sales_history_id}`,
    );
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.detail || "Un error desconocido ha ocurrido";
    throw new Error(errorMessage);
  }
};
