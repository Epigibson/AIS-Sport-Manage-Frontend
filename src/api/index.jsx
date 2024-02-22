import axios from "axios";
import { getToken } from "../utils/tokenUtils.jsx";

export const apiClient = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1",
});

apiClient.interceptors.request.use(
  (config) => {
    const accessToken = getToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
