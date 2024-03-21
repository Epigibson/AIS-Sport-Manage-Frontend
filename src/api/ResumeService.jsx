import { apiClient } from "./index.jsx";

export const getResume = async () => {
  try {
    const response = await apiClient.get("/resume_services/");
    return response.data;
  } catch (error) {
    console.error("No se pudo obtener el resumen de pagos.", error);
  }
  return null;
};
