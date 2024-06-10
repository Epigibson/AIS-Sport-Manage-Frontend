import { apiClient } from "./index.jsx";

export const getUserReceipts = async () => {
  try {
    const response = await apiClient.get("/user_logged/receipts");
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.detail || "Un error desconocido ha ocurrido";
    throw new Error(errorMessage);
  }
};

export const getUserAthletes = async () => {
  try {
    const response = await apiClient.get("/user_logged/athletes");
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.detail || "Un error desconocido ha ocurrido";
    throw new Error(errorMessage);
  }
};
