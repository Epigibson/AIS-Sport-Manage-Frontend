import { apiClient } from "./index.jsx";

export const getAllHistoryPayments = async (options = {}) => {
  try {
    // Construir los parámetros de la consulta
    const queryParams = new URLSearchParams();

    // Añadir parámetros a la consulta solo si están presentes
    if (options.user) {
      queryParams.append("user", options.user);
    }
    if (options.athlete) {
      queryParams.append("athlete", options.athlete);
    }
    if (options.status_pay) {
      queryParams.append("status_pay", options.status_pay);
    }
    if (options.payment_type) {
      queryParams.append("payment_type", options.payment_type);
    }
    if (options.payment_method) {
      queryParams.append("payment_method", options.payment_method);
    }

    const response = await apiClient.get(`/history_payment/?${queryParams}`);
    return response.data;
  } catch (error) {
    console.error("No se pudo inscribir al usaurio.", error);
  }
  return null;
};

export const updatePaymentMethod = async (data) => {
  try {
    console.log("Metodo de Pago", data);
    // Construye los parámetros de consulta correctamente
    const queryParams = new URLSearchParams({
      payment_method: data.payment_method,
    }).toString();
    const response = await apiClient.put(
      `/history_payment/${data.history_payment_id}?${queryParams}`,
    );
    return response.data;
  } catch (error) {
    console.error("No se pudo actualizar el metodo de pago..", error);
  }
  return null;
};

export const editHistoryPaymentExtension = async (data) => {
  try {
    console.log("Metodo de Pago", data);
    // Construye los parámetros de consulta correctamente
    const queryParams = new URLSearchParams({
      extension: data.extension,
    }).toString();
    const response = await apiClient.put(
      `/history_payment/extension/${data.history_payment_id}?${queryParams}`,
    );
    return response.data;
  } catch (error) {
    console.error("No se pudo actualizar el metodo de pago..", error);
  }
  return null;
};
