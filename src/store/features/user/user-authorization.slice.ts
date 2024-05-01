import { createSlice } from '@reduxjs/toolkit'
import { fetchAuthorization } from './user.actions'
import { IToken } from './user.types'

interface IAuthState {
  tokens: IToken
  //todo: проверить ответы сервера при неправильных email, password и привести тип в порядок
  error: null | { email: string; detail: string }
  isLoading: boolean
}

const initialState: IAuthState = {
  tokens: {
    access: '',
    refresh: '',
  },
  error: null,
  isLoading: false,
}

const userAuthorization = createSlice({
  name: 'userAuthorization',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuthorization.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchAuthorization.fulfilled, (state, action) => {
        state.isLoading = false
        state.tokens = action.payload
        window.localStorage.setItem('access_token_svd', state.tokens.access)
        window.localStorage.setItem('refresh_token_svd', state.tokens.refresh)
        const url = window.location.href.split('%22')[1]

        // перенапрявляем на страницу, где поймали ошибку авторизации, либо в профиль
        window.location.href = url || '/profile'
      })
      .addCase(fetchAuthorization.rejected, (state, action) => {
        console.error('ошибка из слайса АВТОРИЗАЦИИ', action.payload)
        state.isLoading = false

        // @ts-ignore
        state.error = action.payload
      })
  },
})

export default userAuthorization.reducer
