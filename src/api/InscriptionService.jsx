import { apiClient } from "./index.jsx";

export const inscribeUser = async (data) => {
  try {
    const response = await apiClient.post("/inscription/", data);
    return response.data;
  } catch (error) {
    console.error("No se pudo inscribir al usaurio.", error);
  }
  return null;
};
