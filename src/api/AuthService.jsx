import { apiClient } from "./index.jsx";

export const login = async (credentials) => {
  try {
    const response = await apiClient.post("/auth/login", credentials);
    return response.data;
  } catch (error) {
    // console.log(error.response.data.detail);
    throw new Error(error.response.data.detail || "Error al inciar sesion.");
  }
};
