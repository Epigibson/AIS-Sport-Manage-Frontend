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

export const subtractAmountReceiptWithBalance = async (data) => {
  try {
    const { receipt_id, amount_to_apply } = data;
    const queryParams = new URLSearchParams({
      amount_to_apply,
    }).toString();
    const response = await apiClient.put(
      `/receipts/subtract_amount_with_balance/${receipt_id}?${queryParams}`,
      data,
    );
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.detail || "Un error desconocido ha ocurrido";
    throw new Error(errorMessage);
  }
};

export const cancelReceipt = async (data) => {
  try {
    const queryParams = new URLSearchParams({
      cancel_reason: data.cancel_reason,
    }).toString();
    const response = await apiClient.put(
      `/receipts/cancel_receipt/${data.receipt_id}?${queryParams}`,
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
