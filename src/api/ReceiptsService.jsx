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

export const payReceipt = async (receipt_id) => {
  try {
    const response = await apiClient.put(`/receipts/pay_receipt/${receipt_id}`);
    return response.data;
  } catch (error) {
    console.error("No se pudo pagar el recibo.", error);
  }
};
