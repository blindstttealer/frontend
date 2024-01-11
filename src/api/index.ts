import axios from "axios";

export const BASE_URL = "http://127.0.0.1:8000/api/v1/auth/";

export const axiosInstance = axios.create({
  // withCredentials: true,
  baseURL: BASE_URL,
});

const urlsSkipAuth = ["users/", "jwt/create/"];

axiosInstance.interceptors.request.use((config) => {
  if (config.url && urlsSkipAuth.includes(config.url)) {
    return config;
  }
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});
