import { apiClient } from "./index.jsx";

export const getUserSession = async () => {
  try {
    const response = await apiClient.get("/user/me");
    return response.data;
  } catch (error) {
    console.error("No se pudo obtener el usuario.", error);
  }
};

export const getAllUsers = async () => {
  try {
    const response = await apiClient.get("/user/list");
    return response.data;
  } catch (error) {
    console.error("No se pudo obtener los usuarios.", error);
  }
};

export const getAllCouches = async () => {
  try {
    const response = await apiClient.get("/user/list/couches");
    return response.data;
  } catch (error) {
    console.error("No se pudo obtener los couches.", error);
  }
};

export const createCouch = async (data) => {
  try {
    const response = await apiClient.post("/user/create_couch", data);
    return response.data;
  } catch (error) {
    console.error("No se pudo crear el couch.", error);
  }
  return null;
};

export const createUser = async (data) => {
  try {
    const response = await apiClient.post("/user/create", data);
    return response.data;
  } catch (error) {
    console.error("No se pudo crear el usuario.", error);
  }
  return null;
};

export const updateUser = async (data) => {
  const { user_id, ...rest } = data;
  try {
    const response = await apiClient.put(`/userupdate/admin/${user_id}`, rest);
    return response.data;
  } catch (error) {
    console.error("No se pudo actualizar el usuario.", error);
  }
  return null;
};

export const deleteUser = async (id) => {
  try {
    const response = await apiClient.delete(`/user/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error("No se pudo eliminar el usuario.", error);
  }
  return null;
};
