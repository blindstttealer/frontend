import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
    isLoading: boolean,
    tokens: {
        access: string,
        refresh: string
    },
    isError: any
}

const initialState: IInitialState = {
    isLoading: false,
    tokens: {
        access: '',
        refresh: ''
    },
    isError: false
}

export const userAuth = createSlice({
    name: 'userAuth',
    initialState,
    reducers: {
        authSuccess: (state, action) => {
            state.isLoading = true
            console.log("данные которые пришли с бека при авторизации", action.payload)
            state.tokens = action.payload
            window.localStorage.setItem("access_token", state.tokens.access)
            window.localStorage.setItem("refresh_token", state.tokens.refresh)
            // state.isLoading = false;
        },
        authFailure: (state, action) => {
            state.isLoading = false;
            console.log("данные с ошибкой при авторизации", action.payload)
            state.isError = action.payload
        },
    }
})

export const { authSuccess, authFailure } = userAuth.actions;
export default userAuth.reducer