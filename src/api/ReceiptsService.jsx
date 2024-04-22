import { apiClient } from "./index.jsx";

export const getAllReceipts = async () => {
  try {
    const response = await apiClient.get("/receipts/");
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.detail || "Un error desconocido ha ocurrido";
    throw new Error(errorMessage);
  }
};

export const payReceipt = async (receipt_id) => {
  try {
    const response = await apiClient.put(`/receipts/pay_receipt/${receipt_id}`);
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.detail || "Un error desconocido ha ocurrido";
    throw new Error(errorMessage);
  }
};

export const cancelReceipt = async (receipt_id) => {
  try {
    const response = await apiClient.put(
      `/receipts/cancel_receipt/${receipt_id}`,
    );
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.detail || "Un error desconocido ha ocurrido";
    throw new Error(errorMessage);
  }
};

export const revertReceipt = async (receipt_id) => {
  try {
    const response = await apiClient.put(
      `/receipts/revert_receipt/${receipt_id}`,
    );
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.detail || "Un error desconocido ha ocurrido";
    throw new Error(errorMessage);
  }
};
