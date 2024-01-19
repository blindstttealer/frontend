import axios from "axios";

export const BASE_URL = "http://127.0.0.1:8000/api/v1/auth/";

const refresh = {
  refresh: localStorage.getItem("refresh_token"),
};

export const axiosInstance = axios.create({
  // withCredentials: true,
  baseURL: BASE_URL,
});

const urlsSkipAuth = ["users/", "jwt/create/"];

axiosInstance.interceptors.request.use((config) => {
  if (config.url && urlsSkipAuth.includes(config.url)) {
    return config;
  }
  config.headers.Authorization = `Bearer ${localStorage.getItem(
    "access_token"
  )}`;
  return config;
});

/* обновление аксесс и рефреш токенов н */
axiosInstance.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status == 401) {
      try {
        const response = await axios.post(`${BASE_URL}jwt/refresh`, refresh);
        localStorage.setItem("access_token", response.data.access);
        return axiosInstance.request(originalRequest);
      } catch (error) {
        console.log("ошибка интерцептора на обновления токенов", error);
      }
    }
  }
);
/* обновление аксесс и рефреш токенов н */
