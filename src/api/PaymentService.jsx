import { apiClient } from "./index.jsx";

export const getAllHistoryPayments = async () => {
  try {
    const response = await apiClient.get("/history_payment/");
    return response.data;
  } catch (error) {
    console.error("No se pudo inscribir al usaurio.", error);
  }
  return null;
};
