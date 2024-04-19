import { apiClient } from "./index.jsx";

export const getAllDebtors = async () => {
  try {
    const response = await apiClient.get("/debtors/");
    return response.data; // Devuelve un array de objetos con los datos de los grupos.
  } catch (error) {
    const errorMessage =
      error.response?.data?.detail || "Un error desconocido ha ocurrido";
    throw new Error(errorMessage);
  }
};
