import { apiClient } from "./index.jsx";

export const inscribeUser = async (data) => {
  try {
    const response = await apiClient.post("/inscription/", data);
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.detail || "Un error desconocido ha ocurrido";
    throw new Error(errorMessage);
  }
};
