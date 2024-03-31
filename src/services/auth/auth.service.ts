import axios from "axios";

export const BASE_URL = "http://127.0.0.1:8000/api/v1/";

export const instanceAxios = axios.create({
    baseURL: BASE_URL,
});

let refresh = {};

if (typeof window !== "undefined") {
    refresh = {
        refresh: localStorage.getItem("refresh_token_svd"),
    };
}

const urlsSkipAuth = ["auth/users/", "auth/jwt/create/", "feed/", "feed/?ordering=-activity_count"];

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
        if (
            error.response.status == 401 &&
            error.response.data.detail !==
            "Не найдено активной учетной записи с указанными данными"
        ) {
            try {
                // console.log("сработал перехватчик на 401 ошибку", error.response);
                const response = await axios.post(`${BASE_URL}auth/jwt/refresh/`, refresh);
                // console.log("данные из перехватчика на 401 ошибку", response);
                localStorage.setItem("access_token_svd", response.data.access);
                return instanceAxios.request(originalRequest);
            } catch (error) {
                // console.log("ошибка интерцептора на обновления токенов", error);
                return Promise.reject(error);
            }
        } else if (
            error.response.data.detail ===
            "Не найдено активной учетной записи с указанными данными"
        ) {
            try {
                // console.log(
                //   "словил ошибку на No active account found with the given credentials",
                //   error
                // );
            } catch (error) {
                return Promise.reject(error);
            }
        }
        // console.log("сработал перехватчик ответа, с ошибкой без статуса 401");
        return Promise.reject(error);
    }
);
