import { apiClient } from "./index.jsx";

export const getUserSession = async () => {
  try {
    const response = await apiClient.get("/user/me");
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.detail || "Un error desconocido ha ocurrido";
    throw new Error(errorMessage);
  }
};

export const getUserById = async (user_id) => {
  try {
    const response = await apiClient.get(`/user/by_object_id/${user_id}`);
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.detail || "Un error desconocido ha ocurrido";
    throw new Error(errorMessage);
  }
};

export const getAllUsers = async () => {
  try {
    const response = await apiClient.get("/user/list");
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.detail || "Un error desconocido ha ocurrido";
    throw new Error(errorMessage);
  }
};

export const getAllUsersAsAdmin = async () => {
  try {
    const response = await apiClient.get("/user/list_as_admin");
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.detail || "Un error desconocido ha ocurrido";
    throw new Error(errorMessage);
  }
};

export const getAllCouches = async () => {
  try {
    const response = await apiClient.get("/user/list/couches");
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.detail || "Un error desconocido ha ocurrido";
    throw new Error(errorMessage);
  }
};

export const createCouch = async (data) => {
  try {
    const response = await apiClient.post("/user/create_couch", data);
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.detail || "Un error desconocido ha ocurrido";
    throw new Error(errorMessage);
  }
};

export const createUserManager = async (data) => {
  try {
    const response = await apiClient.post(
      "/user/create_system_user_manager",
      data,
    );
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.detail || "Un error desconocido ha ocurrido";
    throw new Error(errorMessage);
  }
};

export const createUserAdmin = async (data) => {
  try {
    const response = await apiClient.post(
      "/user/create_system_user_admin",
      data,
    );
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.detail || "Un error desconocido ha ocurrido";
    throw new Error(errorMessage);
  }
};

export const updateUser = async (data) => {
  const { user_id, ...rest } = data;
  try {
    const response = await apiClient.put(`/userupdate/admin/${user_id}`, rest);
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.detail || "Un error desconocido ha ocurrido";
    throw new Error(errorMessage);
  }
};

export const changeUserAvatar = async (data) => {
  console.log("DATA FINAL", data);
  const { user_id } = data;
  try {
    const response = await apiClient.put(`/user/avatar/${user_id}`, data.file);
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.detail || "Un error desconocido ha ocurrido";
    throw new Error(errorMessage);
  }
};

export const deleteUser = async (data) => {
  try {
    const response = await apiClient.delete(`/user/delete/${data}`);
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.detail || "Un error desconocido ha ocurrido";
    throw new Error(errorMessage);
  }
};

export const addBalanceToUser = async (data) => {
  try {
    console.log("DATA", data);
    const queryParams = new URLSearchParams({
      balance_amount: data.balance_amount,
      payment_method: data.payment_method,
    }).toString(); // Convierte los parámetros a una cadena de consulta
    const response = await apiClient.put(
      `/user/add_balance/${data.user_id}?${queryParams}`, // Agrega los parámetros de consulta a la URL
    );
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.detail || "Un error desconocido ha ocurrido";
    throw new Error(errorMessage);
  }
};
export const updateUserBalance = async (data) => {
  try {
    const queryParams = new URLSearchParams({
      balance_amount: data.balance_amount,
      payment_method: data.payment_method,
    }).toString(); // Convierte los parámetros a una cadena de consulta
    console.log("QUERY PARAMS", queryParams);
    const response = await apiClient.put(
      `/user/update_balance/${data.user_id}?${queryParams}`, // Agrega los parámetros de consulta a la URL
    );
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.detail || "Un error desconocido ha ocurrido";
    throw new Error(errorMessage);
  }
};

export const subtractBalanceToUser = async (data) => {
  try {
    const queryParams = new URLSearchParams({
      balance_amount: data.balance_amount,
    }).toString();
    const response = await apiClient.put(
      `/user/subtract_balance/${data.user_id}?${queryParams}`,
    );
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.detail || "Un error desconocido ha ocurrido";
    throw new Error(errorMessage);
  }
};
