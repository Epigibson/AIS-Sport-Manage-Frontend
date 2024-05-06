import { apiClient } from "./index.jsx";

export const getAllMovements = async () => {
  try {
    const response = await apiClient.get(`/movements/`);
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.detail || "Un error desconocido ha ocurrido";
    throw new Error(errorMessage);
  }
};
