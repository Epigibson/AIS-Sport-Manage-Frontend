import { apiClient } from "./index.jsx";

export const login = async (credentials) => {
  try {
    const response = await apiClient.post("/auth/login", credentials);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Error al inciar sesion.");
  }
};
