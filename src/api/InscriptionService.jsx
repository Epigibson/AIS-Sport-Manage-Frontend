import { apiClient } from "./index.jsx";

export const inscribeUser = async (data) => {
  try {
    const queryParams = new URLSearchParams();
    queryParams.append("start_date", data.start_date);
    const response = await apiClient.post(`/inscription/?${queryParams}`, data);
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.detail || "Un error desconocido ha ocurrido";
    throw new Error(errorMessage);
  }
};
