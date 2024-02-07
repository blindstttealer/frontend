import axios from "axios";

export const BASE_URL = "http://127.0.0.1:8000/api/v1/auth/";

export const instanceAxios = axios.create({
  baseURL: BASE_URL,
});

let refresh = {};

if (typeof window !== "undefined") {
  refresh = {
    refresh: localStorage.getItem("refresh_token_svd"),
  };
}

const urlsSkipAuth = ["users/", "jwt/create/"];

instanceAxios.interceptors.request.use(
  (config) => {
    if (config.url && urlsSkipAuth.includes(config.url)) {
      // console.log("сработал перехватчик на запрос");
      return config;
    }
    config.headers.Authorization = `Bearer ${localStorage.getItem(
      "access_token_svd"
    )}`;
    // console.log("сработал перехватчик на POST устанавливает токен");
    return config;
  },
  (error) => {
    // console.log("Ошибка перед отправкой из АКСИОСА", error);
    return Promise.reject(error);
  }
);

instanceAxios.interceptors.response.use(
  (response) => {
    // console.log("сработал перехватчик после ответа без ошибок", response);
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status == 401) {
      try {
        // console.log("сработал перехватчик на 401 ошибку");
        const response = await axios.post(`${BASE_URL}jwt/refresh/`, refresh);
        // console.log("данные из перехватчика на 401 ошибку", response);
        localStorage.setItem("access_token_svd", response.data.access);
        return instanceAxios.request(originalRequest);
      } catch (error) {
        // console.log("ошибка интерцептора на обновления токенов", error);
        return Promise.reject(error);
      }
    }
    // console.log("сработал перехватчик ответа, с ошибкой без статуса 401");
    return Promise.reject(error);
  }
);
