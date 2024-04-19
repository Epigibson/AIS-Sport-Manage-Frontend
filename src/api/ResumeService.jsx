import { apiClient } from "./index.jsx";

export const getResume = async () => {
  try {
    const response = await apiClient.get("/resume_services/");
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.detail || "Un error desconocido ha ocurrido";
    throw new Error(errorMessage);
  }
};
