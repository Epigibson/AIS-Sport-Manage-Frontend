import { apiClient } from "./index.jsx";

export const getUserSession = async () => {
  try {
    const response = await apiClient.get("/user/me");
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.detail || "Un error desconocido ha ocurrido";
    throw new Error(errorMessage);
  }
};

export const getAllUsers = async () => {
  try {
    const response = await apiClient.get("/user/list");
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.detail || "Un error desconocido ha ocurrido";
    throw new Error(errorMessage);
  }
};

export const getAllCouches = async () => {
  try {
    const response = await apiClient.get("/user/list/couches");
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.detail || "Un error desconocido ha ocurrido";
    throw new Error(errorMessage);
  }
};

export const createCouch = async (data) => {
  try {
    const response = await apiClient.post("/user/create_couch", data);
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.detail || "Un error desconocido ha ocurrido";
    throw new Error(errorMessage);
  }
};

export const createUser = async (data) => {
  try {
    const response = await apiClient.post("/user/create", data);
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.detail || "Un error desconocido ha ocurrido";
    throw new Error(errorMessage);
  }
};

export const updateUser = async (data) => {
  const { user_id, ...rest } = data;
  try {
    const response = await apiClient.put(`/userupdate/admin/${user_id}`, rest);
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.detail || "Un error desconocido ha ocurrido";
    throw new Error(errorMessage);
  }
};

export const changeUserAvatar = async (data) => {
  console.log("DATA FINAL", data);
  const { user_id } = data;
  try {
    const response = await apiClient.put(`/user/avatar/${user_id}`, data.file);
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.detail || "Un error desconocido ha ocurrido";
    throw new Error(errorMessage);
  }
};

export const deleteUser = async (data) => {
  try {
    const response = await apiClient.delete(`/user/delete/${data}`);
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.detail || "Un error desconocido ha ocurrido";
    throw new Error(errorMessage);
  }
};
