import axios from 'axios'

//todo: все константы перенести в отдельный файл и заполнять из process.env
export const BASE_URL =  'http://127.0.0.1:8000/api/v1/'

export const instanceAxios = axios.create({
  baseURL: BASE_URL,
})

let refresh = {}

if (typeof window !== 'undefined') {
  refresh = {
    refresh: localStorage.getItem('refresh_token_svd'),
  }
}

const urlsSkipAuth = [
  'auth/users/',
  'auth/jwt/create/',
  'feed/',
  'feed/?ordering=-activity_count',
]

instanceAxios.interceptors.request.use(
  (config) => {
    if (config.url && urlsSkipAuth.includes(config.url)) {
      // console.log("сработал перехватчик на запрос");
      return config
    }
    config.headers.Authorization = `Bearer ${localStorage.getItem(
      'access_token_svd',
    )}`
    // console.log("сработал перехватчик на POST устанавливает токен");
    return config
  },
  (error) => {
    // console.log("Ошибка перед отправкой из АКСИОСА", error);
    return Promise.reject(error)
  },
)

instanceAxios.interceptors.response.use(
  (response) => {
    // console.log("сработал перехватчик после ответа без ошибок", response);
    return response
  },
  async (error) => {
    const originalRequest = error.config

    if (error.response.status == 401) {
      // case 1: error in login process -> incorrect login/password -> show error
      if (
        error.response.data.detail ===
        'Не найдено активной учетной записи с указанными данными'
      ) {
        return Promise.reject(error)
      }
      // case 2: authorization error on any other request -> incorrect access token -> try to refresh it with hepling refresh token
      else {
        try {
          const response = await axios.post(
            `${BASE_URL}auth/jwt/refresh/`,
            refresh,
          )
          // case 2.1: refreshing success -> set access token and refetch original query
          localStorage.setItem('access_token_svd', response.data.access)

          return instanceAxios.request(originalRequest)
        } catch (error) {
          // case 2.2: error on refreshing access token -> refresh token in invalid -> relogin need
          window.location.href = `/activate-page?url="${window.location.href}"`
          return
        }
      }
    }

    // case 3: other error -> standart behavior
    return Promise.reject(error)
  },
)
