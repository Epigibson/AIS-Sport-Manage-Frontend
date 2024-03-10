import { apiClient } from "./index.jsx";

export const getAllRoles = async () => {
  try {
    const response = await apiClient.get("/role/");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getRole = async (id) => {
  try {
    const response = await apiClient.get(`/role/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
