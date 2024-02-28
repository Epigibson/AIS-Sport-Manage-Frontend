import { apiClient } from "./index.jsx";

export const getAllGroups = async () => {
  try {
    const response = await apiClient.get("/groups");
    return response.data; // Devuelve un array de objetos con los datos de los grupos.
  } catch (error) {
    console.error("No se pudo obtener la lista de grupos.", error);
  }
};

export const getGroupById = async (group_id) => {
  try {
    const response = await apiClient.get(`/groups/${group_id}`);
    return response.data; // Devuelve un objeto con los datos del grupo.
  } catch (error) {
    console.error("No se pudo obtener el grupo.", error);
  }
};
