import { apiClient } from "./index.jsx";

export const getAllDiscounts = async () => {
  try {
    const response = await apiClient.get("/discounts/");
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.detail || "Un error desconocido ha ocurrido";
    throw new Error(errorMessage);
  }
};

export const getDiscountsFromProduct = async (product_id) => {
  try {
    const response = await apiClient.get(
      `/discounts/from_product/${product_id}`,
    );
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.detail || "Un error desconocido ha ocurrido";
    throw new Error(errorMessage);
  }
};

export const getDiscountByUuid = async (discount_id) => {
  try {
    const response = await apiClient.get(`/discounts/by_uuid/${discount_id}`);
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.detail || "Un error desconocido ha ocurrido";
    throw new Error(errorMessage);
  }
};

export const getDiscountByObjectId = async (discount_id) => {
  try {
    const response = await apiClient.get(
      `/discounts/by_object_id/${discount_id}`,
    );
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.detail || "Un error desconocido ha ocurrido";
    throw new Error(errorMessage);
  }
};

export const getDiscountByCode = async (discount_code) => {
  try {
    const response = await apiClient.get(`/discounts/by_code/${discount_code}`);
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.detail || "Un error desconocido ha ocurrido";
    throw new Error(errorMessage);
  }
};

export const createDiscount = async (data) => {
  try {
    const response = await apiClient.post("/discounts/", data);
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.detail || "Un error desconocido ha ocurrido";
    throw new Error(errorMessage);
  }
};

export const updateDiscount = async (data) => {
  const { discount_id, ...rest } = data;
  try {
    const response = await apiClient.put(`/discounts/${discount_id}`, rest);
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.detail || "Un error desconocido ha ocurrido";
    throw new Error(errorMessage);
  }
};

export const updateDiscountStatus = async (discount_id) => {
  try {
    const response = await apiClient.put(`/discounts/status/${discount_id}`);
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.detail || "Un error desconocido ha ocurrido";
    throw new Error(errorMessage);
  }
};

export const deleteDiscount = async (discount_id) => {
  try {
    const response = await apiClient.delete(`/discounts/${discount_id}`);
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.detail || "Un error desconocido ha ocurrido";
    throw new Error(errorMessage);
  }
};
