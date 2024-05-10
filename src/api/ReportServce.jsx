import { apiClient } from "./index.jsx";

export const getListAthletesPayments = async () => {
  try {
    const response = await apiClient.get("/reports/");
    return response.data; // Devuelve un array de objetos con los datos de los grupos.
  } catch (error) {
    const errorMessage =
      error.response?.data?.detail || "Un error desconocido ha ocurrido";
    throw new Error(errorMessage);
  }
};

export const getAthletesPaidOrNot = async () => {
  try {
    const response = await apiClient.get("/reports/paid_or_not");
    return response.data; // Devuelve un array de objetos con los datos de los grupos.
  } catch (error) {
    const errorMessage =
      error.response?.data?.detail || "Un error desconocido ha ocurrido";
    throw new Error(errorMessage);
  }
};
