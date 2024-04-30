import { apiClient } from "./index.jsx";

export const getAllAthletes = async () => {
  try {
    const response = await apiClient.get("/athletes/");
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.detail || "Un error desconocido ha ocurrido";
    throw new Error(errorMessage);
  }
};

export const getAthleteByUuid = async (athlete_id) => {
  try {
    const response = await apiClient.get(`/athletes/${athlete_id}`);
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.detail || "Un error desconocido ha ocurrido";
    throw new Error(errorMessage);
  }
};

export const createAthlete = async (data) => {
  try {
    const response = await apiClient.post("/athletes/create", data);
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.detail || "Un error desconocido ha ocurrido";
    throw new Error(errorMessage);
  }
};

export const updateAthlete = async (data) => {
  const { athlete_id, ...rest } = data;
  try {
    const response = await apiClient.put(`/athletes/${athlete_id}`, rest);
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.detail || "Un error desconocido ha ocurrido";
    throw new Error(errorMessage);
  }
};

export const updateAthleteStatus = async (data) => {
  try {
    const response = await apiClient.put(`/athletes/status/${data}`);
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.detail || "Un error desconocido ha ocurrido";
    throw new Error(errorMessage);
  }
};

export const deleteAthlete = async (data) => {
  try {
    const response = await apiClient.delete(`/athletes/${data}`);
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.detail || "Un error desconocido ha ocurrido";
    throw new Error(errorMessage);
  }
};

export const changeAvatar = async (data) => {
  console.log("DATA FINAL", data);
  const { athlete_id } = data;
  try {
    const response = await apiClient.put(
      `/athletes/updateAvatar/${athlete_id}`,
      data.file,
    );
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.detail || "Un error desconocido ha ocurrido";
    throw new Error(errorMessage);
  }
};

export const assignMembershipToAthlete = async (data) => {
  const { membership_id, athlete_id } = data;
  const queryParams = new URLSearchParams();
  queryParams.append("membership_id", membership_id);
  try {
    const response = await apiClient.put(
      `/athletes/assign_membership/${athlete_id}?${queryParams}`,
    );
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.detail || "Un error desconocido ha ocurrido";
    throw new Error(errorMessage);
  }
};

export const removeMembershipFromAthlete = async (data) => {
  const { membership_id, athlete_id } = data;
  const queryParams = new URLSearchParams();
  queryParams.append("membership_id", membership_id);
  try {
    const response = await apiClient.put(
      `/athletes/remove_membership/${athlete_id}?${queryParams}`,
    );
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.detail || "Un error desconocido ha ocurrido";
    throw new Error(errorMessage);
  }
};
