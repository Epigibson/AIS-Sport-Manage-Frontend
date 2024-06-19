import { apiClient } from "./index.jsx";

export const getAllHistoryBalance = async () => {
  try {
    const response = await apiClient.get("/history_balance/");
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.detail || "Un error desconocido ha ocurrido";
    throw new Error(errorMessage);
  }
};
