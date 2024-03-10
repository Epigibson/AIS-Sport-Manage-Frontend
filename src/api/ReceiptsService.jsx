import { apiClient } from "./index.jsx";

export const getAllReceipts = async () => {
  try {
    const response = await apiClient.get("/receipts/");
    return response.data;
  } catch (error) {
    console.error(
      "No se encontraron recibos o hay algun error en la consulta.",
      error,
    );
  }
};
