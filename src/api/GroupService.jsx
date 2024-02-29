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

export const createGroup = async (data) => {
  try {
    const response = await apiClient.post("/groups/", data);
    return response.data; // Devuelve el objeto creado.
  } catch (error) {
    console.error("No se pudo crear el grupo.", error);
  }
};

export const updateGroup = async (data) => {
  const { group_id, ...restData } = data;
  try {
    const response = await apiClient.put(`/groups/${group_id}`, restData);
    return response.data; // Devuelve el objeto actualizado.
  } catch (error) {
    console.error("No se pudo actualizar el grupo.", error);
  }
};

export const deleteGroup = async (group_id) => {
  try {
    const response = await apiClient.delete(`/groups/${group_id}`);
    return response.data; // Devuelve el objeto eliminado.
  } catch (error) {
    console.error("No se pudo eliminar el grupo.", error);
  }
};
