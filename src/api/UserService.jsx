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
