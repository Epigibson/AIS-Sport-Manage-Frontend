import { apiClient } from "./index.jsx";

export const getConfiguration = async () => {
  try {
    const response = await apiClient.get(`/configuration/`);
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.detail || "Un error desconocido ha ocurrido";
    throw new Error(errorMessage);
  }
};

export const editConfiguration = async (data) => {
  try {
    const response = await apiClient.put(`/configuration/`, data);
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.detail || "Un error desconocido ha ocurrido";
    throw new Error(errorMessage);
  }
};
