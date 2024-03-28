import { apiClient } from "./index.jsx";

export const getAllDebtors = async () => {
  try {
    const response = await apiClient.get("/debtors/");
    return response.data; // Devuelve un array de objetos con los datos de los grupos.
  } catch (error) {
    console.error("No se pudo obtener la lista de usuarios.", error);
  }
};
