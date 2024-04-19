import { apiClient } from "./index.jsx";

export const getAllGroups = async () => {
  try {
    const response = await apiClient.get("/groups/");
    return response.data; // Devuelve un array de objetos con los datos de los grupos.
  } catch (error) {
    const errorMessage =
      error.response?.data?.detail || "Un error desconocido ha ocurrido";
    throw new Error(errorMessage);
  }
};

export const getGroupById = async (group_id) => {
  try {
    const response = await apiClient.get(`/groups/${group_id}`);
    return response.data; // Devuelve un objeto con los datos del grupo.
  } catch (error) {
    const errorMessage =
      error.response?.data?.detail || "Un error desconocido ha ocurrido";
    throw new Error(errorMessage);
  }
};

export const createGroup = async (data) => {
  try {
    const response = await apiClient.post("/groups/", data);
    return response.data; // Devuelve el objeto creado.
  } catch (error) {
    const errorMessage =
      error.response?.data?.detail || "Un error desconocido ha ocurrido";
    throw new Error(errorMessage);
  }
};

export const assignUserToGroup = async (data) => {
  const { group, users } = data;
  try {
    const response = await apiClient.post(
      `/groups/assign?group=${encodeURIComponent(group)}`,
      users,
    );
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.detail || "Un error desconocido ha ocurrido";
    throw new Error(errorMessage);
  }
};

export const removeUserFromGroup = async (data) => {
  const { group_id, user_id } = data;
  console.log("DATA", data);
  try {
    const response = await apiClient.put(
      `/groups/remove/${user_id}/${group_id}`,
    );
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.detail || "Un error desconocido ha ocurrido";
    throw new Error(errorMessage);
  }
};

export const updateGroup = async (data) => {
  const { group_id, ...restData } = data;
  try {
    const response = await apiClient.put(`/groups/${group_id}`, restData);
    return response.data; // Devuelve el objeto actualizado.
  } catch (error) {
    const errorMessage =
      error.response?.data?.detail || "Un error desconocido ha ocurrido";
    throw new Error(errorMessage);
  }
};

export const deleteGroup = async (group_id) => {
  try {
    const response = await apiClient.delete(`/groups/${group_id}`);
    return response.data; // Devuelve el objeto eliminado.
  } catch (error) {
    const errorMessage =
      error.response?.data?.detail || "Un error desconocido ha ocurrido";
    throw new Error(errorMessage);
  }
};
