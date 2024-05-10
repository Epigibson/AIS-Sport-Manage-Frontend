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

export const getTotalsOfMonth = async () => {
  try {
    const response = await apiClient.get("/reports/totals_of_months");
    return response.data; // Devuelve un array de objetos con los datos de los grupos.
  } catch (error) {
    const errorMessage =
      error.response?.data?.detail || "Un error desconocido ha ocurrido";
    throw new Error(errorMessage);
  }
};

export const getTotalsOfMonthByFilter = async (options = {}) => {
  try {
    // Construir los parámetros de la consulta
    const queryParams = new URLSearchParams();

    // Añadir parámetros a la consulta solo si están presentes
    if (options.init_date && options.end_date) {
      queryParams.append("init_date", options.init_date);
      queryParams.append("end_date", options.end_date);
    }
    const response = await apiClient.get(
      `/reports/totals_of_months_by_filter?${queryParams}`,
    );
    return response.data; // Devuelve un array de objetos con los datos de los grupos.
  } catch (error) {
    const errorMessage =
      error.response?.data?.detail || "Un error desconocido ha ocurrido";
    throw new Error(errorMessage);
  }
};
