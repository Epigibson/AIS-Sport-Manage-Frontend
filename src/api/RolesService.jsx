import { apiClient } from "./index.jsx";

export const getAllRoles = async () => {
  try {
    const response = await apiClient.get("/role/");
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.detail || "Un error desconocido ha ocurrido";
    throw new Error(errorMessage);
  }
};

export const getRole = async (id) => {
  try {
    const response = await apiClient.get(`/role/${id}`);
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.detail || "Un error desconocido ha ocurrido";
    throw new Error(errorMessage);
  }
};
